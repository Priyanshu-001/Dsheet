import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import table from '../views/table.vue'
import chartView from '../views/chartView.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
 
  {
    path: '/app/table',
    name: 'table',
    component: table
  },
  {
    path: '/app/chart',
    name: 'chart',
    component: chartView
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
