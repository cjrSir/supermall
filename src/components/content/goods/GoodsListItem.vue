<template>
   <div class="goods-item" @click="itemClick">
       <img v-lazy="showImage" @load="imageLoad">
       <div class="goods-info">
           <p>{{goodsItem.title}}</p>
           <span class="price">{{goodsItem.price}}</span>
           <span class="collect">{{goodsItem.cfav}}</span>
       </div>
   </div>
</template>

<script>
// import {debounce} from '../../../common/utils'

export default {
   data () {
      return {

      };
   },
   props: {
       goodsItem: {
        type: Object,
        default() {
            return []
        }
       }
   },

   components: {},

   computed: {
       showImage() {
           return this.goodsItem.image || this.goodsItem.show.img
       }
   },

   methods: {
       //监听图片加载好并判断路由接收对象，并发射出去
       imageLoad() {
        if(this.$route.path.indexOf('/detail')) {
            this.$bus.$emit('homeImageLoad')
        }else if(this.$route.path.indexOf('/home')) {
            this.$bus.$emit('detailItemImgLoad')
        }
        //    this.$bus.$emit('itemImageLoad')
        //    console.log('.............')
       
       },
       itemClick() {
           this.$router.push('/detail/' + this.goodsItem.iid)
       }
   }
}
</script>
<style lang='css' scoped>
    .goods-item {
      padding-bottom: 40px;
      position: relative;
      width: 48%;
    }
    .goods-item img {
        width: 100%;
        border-radius: 5px;
    }
    .goods-info {
        position: absolute;
        font-size: 12px;
        bottom: 5px;
        left: 0;
        right: 0;
        overflow: hidden;
        text-align: center;
    }
    .goods-info p {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-bottom: 3px;
    }
    .goods-info .price {
        color: var(--color-high-text);
        margin-right: 20px;
    }
    .goods-info .collect {
        position: relative;
    }
    .goods-info .collect::before {
        content: '';
        position: absolute;
        left: -15px;
        top: -1px;
        width: 14px;
        height: 14px;
        background: url("../../../assets/images/common/collect.svg") 0 0/14px 14px;
    }
</style>