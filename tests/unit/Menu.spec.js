import { mount, createLocalVue  } from '@vue/test-utils'
import Menu from '@/components/Common/Navigation/Menu'
import VueRouter from 'vue-router'
import Vuex from 'vuex'


import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const localVue = createLocalVue()
localVue.component('font-awesome-icon', FontAwesomeIcon)
localVue.use(VueRouter)
localVue.use(Vuex)

const router = new VueRouter({
  routes: [
    { 
      name: 'Login',
      path: '/login'
    },
    { 
      name: 'Logout',
      path: '/logout'
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

    beforeEach(() => {
      state = {
        isLoggedIn: false
      }
      
      store = new Vuex.Store({      
        state
      })
    })

    it('renders menu with login link', () => {
      const wrapper = factory({
        localVue,
        store,
        router
      })    
      expect(wrapper.find('ul.menu').exists()).toBe(true)      
      expect(wrapper.find('a.login').attributes().href).toBe('/login')
    })

    it('renders menu with logout link', () => {      
      store.state.isLoggedIn = true;

      const wrapper = factory({
        localVue,
        store,
        router
      })

      expect(wrapper.find('ul.menu').exists()).toBe(true)
      expect(wrapper.find('a.logout').attributes().href).toBe('/logout')
    })    
})