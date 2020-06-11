<template>
   <div class="check-button" :class="{check: isChecked}">
       <img src="../../../assets/images/cart/tick.svg" alt="" >
   </div>
</template>

<script>
export default {
   data () {
      return {

      };
   },
   props: {
       isChecked: {
           type:Boolean,
           default: false
       }
   },

   components: {},

   computed: {},

   methods: {}
}
</script>
<style lang='css' scoped>
    .check-button {
        border-radius:50% ;
        border:2px solid #aaa;
    }
    .check {
        border-color: red;
        background-color: red;
    }
</style>