import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/form',
    component: () => import('../views/form.vue')
  },
  {
    path: '/message',
    component: () => import('../views/message.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
