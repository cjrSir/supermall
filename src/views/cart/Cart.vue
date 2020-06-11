<template>
    <div class="cart">
        <!--导航-->
        <NavBar class="nav-bar">
            <div slot="center">购物车({{cartLength}})</div>
        </NavBar>
        <!--列表-->
        <CartList class="cart-list"></CartList>
        <!--汇总-->
        <CartBottomBar></CartBottomBar>
    </div>

</template>

<script>
import NavBar from '../../components/common/navbar/NavBar'
import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar'
import {mapGetters} from 'vuex'

    export default {
        data(){
            return {
            }
        },
        components: {
           NavBar,
           CartList,
           CartBottomBar
        },
        computed: {
            ...mapGetters(['cartLength'])
        }
    }
</script>

<style scoped>
    .cart {
        height: 100vh;
    }
    .nav-bar {
        background-color: var(--color-tint);
        color: #fff;
        font-weight: 700;
    }
</style>
