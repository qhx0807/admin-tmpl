import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/views/Home'
import Login from '@/components/views/Login'
import Table from '@/components/table/Table'
import Chart from '@/components/chart/Chart'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      component: Home,
      children: [
        {
          path: '/table',
          name: 'Table',
          component: Table
        },
        {
          path: '/chart',
          name: 'Chart',
          component: Chart
        }
      ]
    }
  ]
})
