<template>
   <div class="toast"  v-show="show">
       <div>{{message}}</div>
   </div>
</template>

<script>
export default {
   data () {
      return {

      };
   },
   props: {
       message: {
           type: String,
           default:''
       },
       show: {
           type:Boolean,
           default:false
       }
   },

   components: {},

   computed: {},

   methods: {}
}
</script>
<style lang='css' scoped>
    .toast{
        position: fixed;
        top:50%;
        left: 50%;
        color: #fff;
        padding: 8px 10px;
        transform: translate(-50%,-50%);
        background-color: rgba(0, 0, 0, .75);
        z-index: 9;

    }
</style>