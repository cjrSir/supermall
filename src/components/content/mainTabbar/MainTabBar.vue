<template>
  <div id="app">
    <TabBar>
      <TabBarItem path="/home">
        <img src="../../../assets/images/tabbar/home.svg" slot="item-icon">
        <img src="../../../assets/images/tabbar/home_active.svg" slot="item-icon-active">
        <div slot="item-text">首页</div>
      </TabBarItem>
      <TabBarItem path="/category">
        <img src="../../../assets/images/tabbar/category.svg" slot="item-icon">
        <img src="../../../assets/images/tabbar/category_active.svg" slot="item-icon-active">
        <div slot="item-text">分类</div>
      </TabBarItem>
      <TabBarItem path="/cart">
        <img src="../../../assets/images/tabbar/shopcart.svg" slot="item-icon">
        <img src="../../../assets/images/tabbar/shopcart_active.svg" slot="item-icon-active">
        <div slot="item-text">购物车</div>
      </TabBarItem>
      <TabBarItem path="/profile">
        <img src="../../../assets/images/tabbar/profile.svg" slot="item-icon">
        <img src="../../../assets/images/tabbar/profile_active.svg" slot="item-icon-active">
        <div slot="item-text">我的</div>
      </TabBarItem>
    </TabBar>
    <router-view/>
  </div>
</template>


<script>
  import TabBar from '../../common/tabbar/TabBar'
  import TabBarItem from '../../common/tabbar/TabBarItem'
  export default {
    name:'App',
    components:{
      TabBar,TabBarItem
    }
  }
</script>
<style>
  @import "../../../assets/css/base.css";
</style>
