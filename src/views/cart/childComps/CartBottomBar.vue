<template>
  <div class="bottom-bar">
    <div class="check-content" @click="checkClick">
      <CheckButton :isChecked="isSelectAll" class="check-all"></CheckButton>
      <span>全选</span>
    </div>
    <div class="price">
        合计: {{totalPrice}}
    </div>
    <diV class="calculate" @click="calcClick">
      去计算({{(checkLength)}})
    </diV>
    <Toast :message="message" :show="show"></Toast>
  </div>
</template>

<script>
import CheckButton from "../../../components/content/checkButton/CheckButton"
import Toast from '../../../components/common/toast/Toast'
export default {
  data() {
    return {
      message:'',
      show:false
    };
  },

  components: {
    CheckButton,
    Toast
  },

  computed: {
      totalPrice(){
          return '￥' + this.$store.state.cartList.filter(item => {
              return item.checked
          }).reduce((preValue, item) => {
              return preValue + item.price * item.count
          },0).toFixed(2)
      },
      checkLength() {
        return this.$store.state.cartList.filter(item => item.checked).length
      },
      isSelectAll() {
        if(this.$store.state.cartList.length === 0) return false

        for(let item of this.$store.state.cartList){
          if(!item.checked){
            return false
          }
        }
        return true
        //使用find
        // return !this.$store.state.cartList.find(item => !item.checked)
      }
  },

  methods: {
    checkClick() {
      if(this.isSelectAll){//全部选中
        this.$store.state.cartList.forEach(item => item.checked = false)
      }else{//部分未选中或者全部不选中
        this.$store.state.cartList.forEach(item => item.checked = true)
      }
    },
    calcClick() {
      if(!this.isSelectAll) {
        this.show = true
        this.message = '请选择一件商品'
        setTimeout(() => {
          this.show = false
          this.message = ''
        },1500)
      }
    }

  }
};
</script>
<style lang='css' scoped>
.bottom-bar {
  position: absolute;
  display: flex;
  height: 40px;
  bottom: 50px;
  left: 0;
  right: 0;
  background-color: #eee;
  font-size: 14px;
  line-height: 40px;
}
.check-content {
  display: flex;
  align-items: center;
  margin-left: 10px;
}
.check-all {
  height: 18px;
  width: 18px;
  line-height: 20px;
  margin-right: 5px;
}
.price {
    margin-left: 20px;
}
.calculate{
  width: 90px;
  position: absolute;
  text-align: center;
  color:#fff;
  background-color: red;
  border-radius: 10%;
  right: 0;
}
</style>