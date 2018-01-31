import Vue from 'vue'
import Router from 'vue-router'
// import Home from '@/components/views/Home'
// import Login from '@/components/views/Login'
// import Table from '@/components/table/Table'
// import Chart from '@/components/chart/Chart'
// import Dashboard from '@/components/dashboard/Dashboard'
// const Home = () => import('@/components/views/Home')
const Login = r => require.ensure([], () => r(require('@/components/views/Login')))
const Home = r => require.ensure([], () => r(require('@/components/views/Home')))
const Table = r => require.ensure([], () => r(require('@/components/table/Table')))
const Dashboard = r => require.ensure([], () => r(require('@/components/dashboard/Dashboard')))
const Chart = r => require.ensure([], () => r(require('@/components/chart/Chart')))
const Table1 = r => require.ensure([], () => r(require('@/components/declare/Table1')))
const Table2 = r => require.ensure([], () => r(require('@/components/declare/Table2')))
const Table3 = r => require.ensure([], () => r(require('@/components/declare/Table3')))
const Table4 = r => require.ensure([], () => r(require('@/components/declare/Table4')))
const Table5 = r => require.ensure([], () => r(require('@/components/declare/Table5')))
const Table6 = r => require.ensure([], () => r(require('@/components/declare/Table6')))

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
        },
        {
          path: '/dashboard',
          name: 'Dashboard',
          component: Dashboard
        },
        {
          path: '/table1',
          name: 'Table1',
          component: Table1
        },
        {
          path: '/table2',
          name: 'Table2',
          component: Table2
        },
        {
          path: '/table3',
          name: 'Table3',
          component: Table3
        },
        {
          path: '/table4',
          name: 'Table4',
          component: Table4
        },
        {
          path: '/table5',
          name: 'Table5',
          component: Table5
        },
        {
          path: '/table6',
          name: 'Table6',
          component: Table6
        }
      ]
    }
  ]
})
