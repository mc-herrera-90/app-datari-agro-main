import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

const URL_API = 'https://api.agro.datari.site'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: null,
    token: localStorage.getItem('token') || '',
    user: {},
    selectProducer: parseInt(localStorage.getItem('selectedProducer'), 10) || null,
    generalData: {},
    producers: [
      { id: 1, nombre: '1' },
      { id: 2, nombre: '2' },
      { id: 3, nombre: '3' },
      { id: 4, nombre: '4' },
      { id: 5, nombre: '5' },
      { id: 6, nombre: '6' },
      { id: 7, nombre: '7' },
      { id: 8, nombre: 'Admin' },
    ],
  },

  mutations: {
    auth_request(state) {
      state.status = 'loading'
    },
    auth_success(state, token, user) {
      state.status = 'success'
      state.token = token
      state.user = user
    },
    auth_error(state) {
      state.status = 'error'
    },
    logout(state) {
      state.status = ''
      state.token = ''
    },
    setSelectedProducer(state, producerId) {
      state.selectedProducer = producerId;
    },
    setGeneralData(state, data) {
      state.generalData = data;
    },
  },
  actions: {
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({
          url: URL_API + '/auth/login/',
          data: user,
          method: 'POST'
        })
          .then(response => {
            const token = response.data.access_token;
            const user = response.data.user;
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
            localStorage.setItem('token', token)
            localStorage.setItem('username', user.username)
            localStorage.setItem('user_id', user.pk)
            localStorage.setItem('user_role', user.is_staff ? 'admin' : 'user')
            localStorage.setItem('user_superuser', user.is_superuser ? 'si' : 'no')
            commit('auth_success', token, user)
            resolve(response)
          })
          .catch(err => {
            commit('auth_error')
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            delete axios.defaults.headers.common['Authorization']
            reject(err)
          })
      })
    },

    logout({ commit }) {
      return new Promise((resolve) => {
        commit('logout')
        // axios({
        //   url: URL_API+'/auth/logout/',
        //   method:'POST'
        // })

        localStorage.removeItem('token')
        localStorage.removeItem('user_role')
        localStorage.removeItem('user_superuser')
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        localStorage.removeItem('user_id')
        resolve()
      })
    },
    updateSelectedProducer({ commit }, producerId) {
      commit('setSelectedProducer', producerId);
    },
    async fetchGeneralData({ commit }, producerId) {
      try {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.state.token

        const response = await axios.get(`${URL_API}/api/productores/${producerId}/`);
        commit('setGeneralData', response.data);
        localStorage.setItem('selectedProducer', producerId);
        console.log(response.data);
      } catch (error) {
        console.error('Error al cargar los datos:', error);
      }
    },
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    get_user: state => state.user,
    getGeneralData: (state) => state.generalData,
    selectedProducer: (state) => {
      return state.producers.find((p) => p.id === state.selectedProducer);
    },
  }
})
