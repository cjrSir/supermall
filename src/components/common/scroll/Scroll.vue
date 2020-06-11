<template>
   <div class="wrapper" ref="wrapper">
       <div class="content">
       <slot></slot>
       </div>
   </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
    name:"Scroll",
    props: {
       probeType :{
          type: Number,
          default: 0
       },
       pullUpLoad: {
          type :Boolean,
          default: false
       }
    },
    data () {
      return {
            scroll:null
      };
   },
   mounted() {
      //创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper, {
         click: true,
         probeType: this.probeType,
         pullUpLoad: this.pullUpLoad
      })
      //监听滚动位置
      this.scroll.on('scroll', (position) => {
         this.$emit('scroll',position)
      })
      this.scroll.on('pullingUp', () => {
         this.$emit('pullingUp')
      })
   },

   components: {},

   computed: {},

   methods: {
      scrollTo(x, y, time=300) {
         this.scroll && this.scroll.scrollTo(x ,y ,time)
      },
      refresh() {
         this.scroll && this.scroll.refresh()
         // console.log('------------')
      },
      finishPullUp() {
         this.scroll && this.scroll.finishPullUp()
      },
      getScrollY() {
         return this.scroll ? this.scroll.y : 0
      }
   }
}
</script>
<style lang='css' scoped>

</style> 