<template>
   <div class="tab-control">
       <div v-for="(item,index) in titles" :key="index"
        class="tab-control-item" 
        :class="{active: index === currentIndex}" @click="itemClick(index)">
           <span>{{item}}</span>
       </div>
   </div>
</template>

<script>
export default {
   data () {
      return {
          currentIndex: 0
      };
   },
   props:{
       titles:{
           type:Array,
           default(){
               return []
           }
       }
   },

   components: {},

   computed: {},

   methods: {
       itemClick(index){
           this.currentIndex = index;
           this.$emit('tabClick', index)
       }
   }
}
</script>
<style lang='css' scoped>
    .tab-control {
        display: flex;
        text-align: center;
        font-size: 15px;
    }
    .tab-control-item {
        flex: 1;
        height: 40px;
        line-height: 40px;
        background-color: #ffffff;
    }
    .active {
        color: var(--color-high-text);
    }
    .active span {
        padding: 5px;
        border-bottom: 3px solid var(--color-high-text);
    }
</style>