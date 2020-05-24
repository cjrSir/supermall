<template>
   <div class="tab-control">
       <div v-for="(item,index) in titles" :key="index">
           <span>{{item}}</span>
       </div>
   </div>
</template>

<script>
export default {
   data () {
      return {

      };
   },
   props:{
       title:{
           type:Array,
           default(){
               return []
           }
       }
   },

   components: {},

   computed: {},

   methods: {}
}
</script>
<style lang='css' scoped>

</style>