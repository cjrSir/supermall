export default{
    addCart(context, payload) {
        return new Promise((resolve, reject) => {
          let oldProduct = null
          //遍历判断是否为同一件商品
          for(let item of context.state.cartList){
            if(item.iid === payload.iid) {
              oldProduct = item
            }
          }
          //同一件商品数量加一
          if(oldProduct) {
            // oldProduct.count += 1
            context.commit('addCounter', oldProduct)
            resolve('当前商品数量加一')
          }else{
            //不一样则push上去
            payload.count = 1
            // context.state.cartList.push(payload)
            context.commit('addToCart', payload)
            resolve('添加商品成功')
          }
        })
      }
}
