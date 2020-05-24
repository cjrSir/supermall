<template>
    <div id="tabbar">
        <slot></slot>
    </div>
</template>

<script>
    //import someComponent from './someComponent'
    export default {
        name: "",
        data(){
            return {
                msg: "Hello Vue.js"
            }
        },
        component: {
            //someComponent
        }
    }
</script>

<style scoped>
    #tabbar{
        display: flex;
        background-color: #f6f6f6;
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        box-shadow: 0 -3px 1px rgba(100,100,100,.1);
    }

</style>
