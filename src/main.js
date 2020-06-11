import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import fastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

//解决移动端300ms延迟
fastClick.attach(document.body)
//图片懒加载
Vue.use(VueLazyload, {
    loading: require('./assets/images/common/placeholder.png')
})
