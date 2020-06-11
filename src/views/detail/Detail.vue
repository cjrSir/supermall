<template>
  <div id="detail">
    <DetailNavBar @titleClick="titleClick" ref="nav"></DetailNavBar>
    <Scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <DetailSwiper :topImages="topImages"></DetailSwiper>
      <DetailBaseInfo :goods="goods"></DetailBaseInfo>
      <DetailShopInfo :shop="shop"></DetailShopInfo>
      <DetailParamInfo ref="param" :paramInfo="paramInfo"></DetailParamInfo>
      <DetailGoodsInfo :detailInfo="detailInfo" @imageLoad="imageLoad"></DetailGoodsInfo>
      <DetailCommentInfo ref="comment" :commentInfo="commentInfo"></DetailCommentInfo>
      <GoodsList ref="recommends" :goods="recommends"></GoodsList>
    </Scroll>
    <DetailBottomBar @addToCart="addCart"></DetailBottomBar>
    <BackTop class="backTop" @click.native="backClick" v-show="isShowBackTop"></BackTop>
    <Toast :message="message" :show="show"></Toast>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend
} from "../../network/detail";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import Scroll from "../../components/common/scroll/Scroll";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import GoodsList from "../../components/content/goods/GoodsList";
import DetailBottomBar from "./childComps/DetailBottomBar";
import { debounce } from "../../common/utils";
// import BackTop from '../../components/content/backTop/BackTop'
import { backTopMiXin } from "../../common/mixin";
import Toast from '../../components/common/toast/Toast'
import {mapActions} from 'vuex'

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      TopYs: [],
      getTopYs: null,
      currentIndex: 0,
      message:'',
      show:false
      //   isShowBackTop:false,
    };
  },

  //混入
  mixins: [backTopMiXin],

  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    Toast
    //    BackTop
  },
  //created,activated
  created() {
    //1.保存传入的iid
    this.iid = this.$route.params.iid;
    //2.根据iid请求详情数据
    getDetail(this.iid).then(res => {
      //    console.log(res)
      const data = res.data.result;
      this.topImages = data.itemInfo.topImages;

      //获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // console.log(data.shopInfo.services)

      //创建店铺信息的对象
      this.shop = new Shop(data.shopInfo);
      // console.log(data.shopInfo)

      //保存商品详情数据
      this.detailInfo = data.detailInfo;
      // console.log(data.detailInfo)

      //获取参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      // console.log(data)

      //取出评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
    });

    //3.请求详情数据
    getRecommend().then(res => {
      this.recommends = res.data.data.list;
      console.log(this.recommends);
    });
    //图片加载完成后，才能获取正确的高度
    this.getTopYs = debounce(() => {
      this.TopYs = [];
      this.TopYs.push(0);
      this.TopYs.push(this.$refs.param.$el.offsetTop);
      this.TopYs.push(this.$refs.comment.$el.offsetTop);
      this.TopYs.push(this.$refs.recommends.$el.offsetTop);
      //多加一个值可以减少判断条件
      this.TopYs.push(Number.MAX_VALUE);
      // console.log(this.TopYs)
    }, 50);
  },

  computed: {},

  mounted() {
    //图片加载事件监听
    const refresh = debounce(this.$refs.scroll.refresh, 50);
    //接收图片加载完成，并刷新
    this.$bus.$on("detailItemImgLoad", () => {
      refresh();
    });
    //获取tabControl的offsetTop
    //所有的组件都有一个属性$el：用于获取组件中的元素
    // console.log(this.$refs.tabControl.$el.offsetTop)
  },

  methods: {
    ...mapActions(['addCart']),

    imageLoad() {
      this.$refs.scroll.refresh();

      this.getTopYs();
    },

    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.TopYs[index], 500);
    },
    contentScroll(position) {
      //获取Y值
      const positionY = -position.y;

      let length = this.TopYs.length;
      // for(let i = 0; i < length; i++) {
      //     if(this.currentIndex !== i && ((i < length-1 && positionY >= this.TopYs[i] && positionY < this.TopYs[i+1] ) || ((i=== length-1 && positionY >= this.TopYs[i])))) {
      //         this.currentIndex = i
      //         this.$refs.nav.currentIndex = this.currentIndex
      //     }
      // }
      //随着滚动位置而改变currentIndex的值
      for (let i = 0; i < length - 1; i++) {
        if (
          this.currentIndex !== i &&
          i < length - 1 &&
            positionY >= this.TopYs[i] &&
            positionY < this.TopYs[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
      //判断BackTop是否显示
      this.isShowBackTop = -position.y > 1000;
    },
    //     backClick() {
    //   //找到scroll组件，运用scroll的scrollTo方法
    // //   this.$refs.scroll.scrollTo(0,0,300)
    // },
    addCart() {
      //1.获取购物车需要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      //2.将商品添加到购物车里
      this.$store.dispatch('addCart', product).then(res => {
        console.log(res)
      this.show = true
        this.message = res

        setTimeout(() => {
          this.show = false
          this.message = ''
        },1500)
      })
      //返回promise
      // this.addCart(product).then((res => {
      //   this.show = true
      //   this.message = res

      //   setTimeout(() => {
      //     this.show = false
      //     this.message = ''
      //   },1500)
      //   console.log(res)
      // }))

      //3.添加到购物车
    }
  }
};
</script>
<style lang='css' scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.content {
  position: absolute;
  top: 44px;
  left: 0;
  right: 0;
  bottom: 58px;
  z-index: 9;
  overflow: hidden;
}
.backTop {
  z-index: 9;
}
</style>