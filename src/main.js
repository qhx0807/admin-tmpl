// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui'
import '../theme/element-variables.scss'
import 'element-ui/lib/theme-chalk/display.css'

import 'babel-polyfill'

Vue.config.productionTip = false

Vue.use(ElementUI, { size: 'medium' })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
