import Vue from 'vue'
import store from '../store/index.js'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Login from '../views/Login.vue'
import IndexView from '../views/indexView.vue'
import AccesoDenegado from '../views/AccesoDenegado.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/index',
    name: 'Index',
    component: IndexView
  },
  {
    path: '/',
    component: Dashboard,
    props: true,
    children: [
      {
        path: '',
        component: () => import('../views/Home.vue'),
        props: true,
      },
      {
        path: 'caracterizacion/',
        component: () => import(/* webpackChunkName: "about" */ '../views/CaracterizacionView.vue'),
      },
      {
        path: 'rating/',
        component: () => import(/* webpackChunkName: "about" */ '../views/RatingView.vue'),
      },
      {
        path: 'materiaprima/',
        component: () => import(/* webpackChunkName: "about" */ '../views/MateriaPrimaView.vue'),
      },
      // {
      //   path: 'detallesencuesta/',
      //   component: () => import(/* webpackChunkName: "about" */ '../views/DetallesView.vue'),
      // },
      {
        path: 'acceso-denegado/',
        name: 'AccesoDenegado',
        component: () => import(/* webpackChunkName: "about" */'../views/AccesoDenegado.vue'),
      },
      {
        path: '/detallesencuesta/:producerId',
        name: 'DetallesView',
        component: () => import(/* webpackChunkName: "about" */ '../views/DetallesView.vue'),
        props: true,
        // Este guard de navegación permite establecer el producerId en el store antes de cargar la vista
        beforeEnter: (to, from, next) => {
          const producerId = to.params.producerId;
          store.dispatch('updateSelectedProducer', producerId).then(() => {
            next();
          }).catch((error) => {
            console.error('Error al actualizar el producerId:', error);
            next(false); // Cancela la navegación si ocurre un error
          });
        }
      },
      
    ],
    meta: {
      requiresAuth: true
    },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login') 
  } else {
    next() 
  }
})

export default router
