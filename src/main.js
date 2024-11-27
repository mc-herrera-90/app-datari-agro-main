import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import './plugins/vue-apexchart'


Vue.config.productionTip = true

Vue.prototype.$http = axios;
const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = 'Bearer '+token
}



// export default (state) => {
//   axios.defaults.withCredentials = true
//   axios.defaults.baseURL = process.env.API_URL
//   Vue.prototype.$axios = axios
//   state.$axios = axios
// }

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
