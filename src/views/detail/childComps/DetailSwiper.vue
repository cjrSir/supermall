<template>
<div>
       <Swiper class="detail-swiper">
           <SwiperItem v-for="(item,index) in topImages" :key="index">
               <img :src="item" >
           </SwiperItem>
       </Swiper>
</div>
</template>

<script>
import {Swiper, SwiperItem} from '../../../components/common/swiper'
export default {
   data () {
      return {

      };
   },
   props: {
       topImages: {
           type:Array,
           deafult() {
               return []
           }
       }
   },

   components: {
       Swiper,
       SwiperItem
   },

   computed: {},

   methods: {}
}
</script>
<style lang='css' scoped>
    .detail-swiper{
        height:300px;
        overflow: hidden;
    }
</style>