<template>
   <div class="cart-list">
       <Scroll class="content" ref="scroll">
           <CartListItem 
           v-for="(item, index) in cartList" 
           :key="index" 
           :itemInfo="item"></CartListItem>
       </Scroll>
   </div>
</template>

<script>
import Scroll from '../../../components/common/scroll/Scroll'
import {mapGetters} from 'vuex'
import CartListItem from './CartListItem'
export default {
   data () {
      return {

      };
   },

   components: {
       Scroll,
       CartListItem
   },

   computed: {
       ...mapGetters(['cartList'])
   },
   activated() {
       this.$refs.scroll.refresh()
   },

   methods: {}
}
</script>
<style lang='css' scoped>
    .cart-list {
        height: 100vh;
    }
    .content { 
        position: absolute;
        left: 0;
        right: 0;
        top: 44px;
        bottom: 89px;
        overflow: hidden;
    }
</style>