/* NOTE: 
   Tests pass with error
    [Vuetify] Multiple instances of Vue detected
    See https://github.com/vuetifyjs/vuetify/issues/4068

    If you're seeing "$attrs is readonly", it's caused by this
 */

import { mount, createLocalVue } from '@vue/test-utils'
import Menu from '@/components/Common/Navigation/Menu'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import Vuetify from 'vuetify'


import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const localVue = createLocalVue()
localVue.component('font-awesome-icon', FontAwesomeIcon)
localVue.use(VueRouter)
localVue.use(Vuex)
localVue.use(Vuetify)

const router = new VueRouter({
  routes: [
    { 
      name: 'Login',
      path: '/login'
    },
    { 
      name: 'Logout',
      path: '/logout'
    },
    { 
      name: 'create-post',
      path: '/create-post'
    }
  ],
  mode: 'history'
})

const factory = (opts = {}) => {
    return mount(Menu, opts)
}
  

describe('Menu', () => {
    let store
    let state 
    let vuetify

    beforeEach(() => {
      state = {
        isLoggedIn: false
      }
      
      store = new Vuex.Store({      
        state
      })

      vuetify = new Vuetify()
    })

    it('renders menu with login link',  async () => {
      const wrapper = factory({
        localVue,
        store,
        router,
        vuetify
      })    
      const event = jest.fn()
      expect(wrapper.find('.v-menu').exists()).toBe(true)      

      const button = wrapper.find('.v-btn')        
      button.vm.$on('click', event)

      expect(event).toHaveBeenCalledTimes(0)

      button.trigger('click')
      await localVue.nextTick()

      expect(event).toHaveBeenCalledTimes(1)

      expect(wrapper.find('a.login').attributes().href).toBe('/login')
    })

    it('renders menu with logout link and create post if logged in', async () => {      
      store.state.isLoggedIn = true;

      const wrapper = factory({
        localVue,
        store,
        router,
        vuetify
      })

      const event = jest.fn()
      expect(wrapper.find('.v-menu').exists()).toBe(true)

      const button = wrapper.find('.v-btn')        
      button.vm.$on('click', event)

      expect(event).toHaveBeenCalledTimes(0)

      button.trigger('click')
      await localVue.nextTick()

      expect(event).toHaveBeenCalledTimes(1)

      expect(wrapper.find('a.logout').attributes().href).toBe('/logout')
      expect(wrapper.find('a.create-post').attributes().href).toBe('/create-post')
    })  
    
    
})
