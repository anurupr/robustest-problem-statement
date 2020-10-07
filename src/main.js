import Vue from 'vue'
import App from './App.vue'
import store from '@/store'
import router from '@/router'
import './assets/global.css'

import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } from '@fortawesome/vue-fontawesome'
import Modal from '@/components/Common/Layout/Modal'
import Popup from '@/components/Common/Interface/Popup'
import TextBox from '@/components/Common/Input/TextBox'

import vuetify from './plugins/vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'font-awesome/css/font-awesome.css'

// Registering global components
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('font-awesome-layers', FontAwesomeLayers)
Vue.component('font-awesome-layers-text', FontAwesomeLayersText)
Vue.component('modal', Modal)
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
  vuetify,
  router
}).$mount('#app')
