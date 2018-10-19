import Vue from 'vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import VueResource from 'vue-resource'
import './utils/logger'
import './filters/stringFilters'
import { InterceptorService } from './services/interceptorService'

Vue.use(VueResource);
Vue.use(ElementUI);
Vue.config.productionTip = false

Vue.directive('focus', {
  inserted: function (el) {
    Vue.nextTick(function() {
      el.focus()
    })
  }
})

Vue.http.interceptors.push((request, next) => {
  InterceptorService.adjuntarToken(request)
  next((response) => {
    if(!response.ok){
    }
  })
})

new Vue({
  render: h => h(App),
  router: router,
  store
}).$mount('#app')
