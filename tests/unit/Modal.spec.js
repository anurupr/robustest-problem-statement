import { mount, createLocalVue } from '@vue/test-utils'
import Vue from 'vue'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'

import Modal from '@/components/Common/Layout/Modal'


const localVue = createLocalVue()
localVue.use(Vuetify)
localVue.use(VueRouter)

const factory = (opts = {}) => {
  return mount(Modal, opts)
}

const $route = {
  path: '/some/path'
}

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

describe('Modal', () => {
    let vuetify    

    beforeEach(() => {
      vuetify = new Vuetify()
    })
    it('renders v-dialog but hidden', () => {
      const wrapper = factory({
        localVue,
        vuetify,
        router,
        mocks: {
          $route
        }
      })
      expect(wrapper.find('.v-dialog').exists()).toBe(true)
      expect(wrapper.find('.v-dialog').attributes().style.indexOf('display: none')).not.toBe(-1)
    })

    it('renders v-dialog visible', async  () => {
      const wrapper = factory({
        propsData: {
          value: true
        },
        localVue,      
        vuetify,
        router,
        mocks: {
          $route
        }
      })
      await localVue.nextTick()

      expect(wrapper.find('.v-dialog').attributes().style.indexOf('display: none')).toBe(-1)
      
    })

    it('renders v-dialog visible - click btn to hide', async  () => {
      const wrapper = factory({
        propsData: {
          value: true
        },
        localVue,
        vuetify,
        router,
        mocks: {
          $route
        }
      })

      await localVue.nextTick()
      expect(wrapper.find('.v-dialog').attributes().style.indexOf('display: none')).toBe(-1)

      const event = jest.fn()
      const button = wrapper.find('button')
      button.vm.$on('click', event)
      expect(event).toHaveBeenCalledTimes(0)
      button.trigger('click')        
      await localVue.nextTick()
      expect(event).toHaveBeenCalledTimes(1)

      expect(wrapper.find('.v-dialog').attributes().style.indexOf('display: none')).toBe(-1)
      
    })

})