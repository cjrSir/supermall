<template>
  <div id="home" class="wrapper">
      <NavBar class="navbar"><div slot="center">购物街</div></NavBar>
     <tab-control ref="tabControl1" v-show="isTabFixed"
      :titles="['流行','新款','精选']" 
      @tabClick="tabClick" class="tab-control"/>

     <scroll class="content" 
     ref="scroll" 
     :probe-type="3" 
     @scroll="contentScroll"
     :pull-up-load="true"
     @pullingUp="loadMore">

      <HomeSwiper :banners="banners" @imageLoad="imageLoad"></HomeSwiper>
      <HomeRecommendView :recommends="recommends"></HomeRecommendView>
      <FeatureView></FeatureView>
      <tab-control ref="tabControl2"
      :titles="['流行','新款','精选']" 
      @tabClick="tabClick"/>
      <goods-list :goods="showGoods"></goods-list>
     </scroll>
     <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
// @ is an alias to /src
import {getHomeMultidata ,getHomeGoods} from "../../network/home.js"
import NavBar from '../../components/common/navbar/NavBar.vue'
import HomeSwiper from './childComps/HomeSwiper'
import HomeRecommendView from './childComps/HomeRecommendView'
import FeatureView from './childComps/FeatureView'
import TabControl from '../../components/content/tabControl/TabControl'
import GoodsList from '../../components/content/goods/GoodsList'
import scroll from '../../components/common/scroll/Scroll'
import BackTop from '../../components/content/backTop/BackTop'
import {debounce} from '../../common/utils'

export default {
  name: 'Home',
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    scroll,
    BackTop
  },
  data(){
    return{   
      banners: [],
      recommends: [],
      goods:{
        'pop' :{page: 0, list: []},
        'new' :{page: 0, list: []},
        'sell' :{page: 0, list: []},
      },
      currentType :'pop',
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY:0,
    }
  },
  created(){
    this.getHomeMultidata(),
    this.getHomeGoods('pop'),
    this.getHomeGoods('new'),
    this.getHomeGoods('sell')
  },
  mounted(){
    //图片加载事件监听
    const refresh = debounce(this.$refs.scroll.refresh,50)
    //接收图片加载完成，并刷新
    this.$bus.$on('homeImageLoad', () => {
      refresh()
    })
    //获取tabControl的offsetTop
    //所有的组件都有一个属性$el：用于获取组件中的元素
    // console.log(this.$refs.tabControl.$el.offsetTop)

  },
  computed:{
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
  activated() {
      this.$refs.scroll.refresh()
      this.$refs.scroll.scrollTo(0,this.saveY,0)
    },
    deactivated() {
      this.saveY = this.$refs.scroll.getScrollY()
    },
  methods: {
    //事件监听


    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      //让两个TabContril的currentIndex保持一致
      this.$refs.tabControl1.currentIndex = index,
      this.$refs.tabControl2.currentIndex = index
    },
    backClick() {
      //找到scroll组件，运用scroll的scrollTo方法
      this.$refs.scroll.scrollTo(0,0,500)
    },
    contentScroll(position) {
      //判断BackTop是否显示
      this.isShowBackTop = -position.y > 1000
      //决定tabControl是否吸顶
      this.isTabFixed = (-position.y) >this.tabOffsetTop

    },
    loadMore(){
      this.getHomeGoods(this.currentType)
    },

    imageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },



    //网络请求
      getHomeMultidata() {
        getHomeMultidata().then(res => {
        this.banners = res.data.data.banner.list
        this.recommends = res.data.data.recommend.list
        console.log(res)
    })
      },
      getHomeGoods(type){
        const page = this.goods[type].page + 1
        getHomeGoods(type,page).then(res => {
          this.goods[type].list.push(...res.data.data.list)
          this.goods[type].page += 1

          //完成加载更多
          this.$refs.scroll.finishPullUp()
        })
      }
  }
}
</script>

<style scoped>
    #home{
      /* padding-top: 44px; */
      height: 100vh;
      position: relative;
    }
    .navbar{
      background-color:var(--color-tint);
      color: #fff;

      /* position: fixed;
      left: 0;
      right: 0;
      top: 0;
      z-index: 9; */
    }
    .content {
      /* height: 100%; */
      overflow: hidden;
      position: absolute;
      top:44px;
      bottom: 49px;
      right: 0;
      left: 0;
    }
    .tab-control {
      position: relative;
      z-index: 9;
    }
</style>
