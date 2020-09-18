import Vue from 'vue'
import App from './App.vue'
import store from '@/store'
import router from '@/router'
import './assets/reset.css'
import './assets/global.css'

import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } from '@fortawesome/vue-fontawesome'
import Modal from '@/components/Common/Layout/Modal'
import Column from '@/components/Common/Layout/Column'
import Container from '@/components/Common/Layout/Container'
import Row from '@/components/Common/Layout/Row'
import Popup from '@/components/Common/Interface/Popup'
import TextBox from '@/components/Common/Input/TextBox'

// Registering global components
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('font-awesome-layers', FontAwesomeLayers)
Vue.component('font-awesome-layers-text', FontAwesomeLayersText)
Vue.component('container', Container)
Vue.component('modal', Modal)
Vue.component('column', Column)
Vue.component('row', Row)
Vue.component('popup', Popup)
Vue.component('text-box', TextBox)

Vue.directive('focus', {
  // When the bound element is inserted into the DOM...
  inserted: function (el) {
    // Focus the element
    el.focus()
  }
})


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
