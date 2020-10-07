/* NOTE: 
   Tests pass with error
    [Vuetify] Multiple instances of Vue detected
    See https://github.com/vuetifyjs/vuetify/issues/4068

    If you're seeing "$attrs is readonly", it's caused by this

    [vue-test-utils]: overwriting methods via the `methods` property is deprecated and will be removed in the next major version. There is no clear migration path for the `methods` property - Vue does not support arbitrarily replacement of methods, nor should VTU. To stub a complex method extract it from the component and test it in isolation. Otherwise, the suggestion is to rethink those tests.
    TODO - find a better way
 */

import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'

import DeleteComment from '@/components/Social/DeleteComment'
import Modal from '@/components/Common/Layout/Modal'

const localVue = createLocalVue()
localVue.component('modal', Modal)
localVue.use(Vuex)
localVue.use(Vuetify)
localVue.use(VueRouter)

const factory = (opts = {}) => {
    return mount(DeleteComment, opts)
}

const router = new VueRouter({
    mode: 'history'
})

const $route = {
    params: {
        id: 2
    }
}   

describe('DeleteComment', () => {
    let store
    let state
    let actions
    let vuetify
  
    beforeEach(() => {    
      state = {}
      actions = {
        modalVisible: jest.fn(),
        deleteComment: jest.fn()
      }
      
      store = new Vuex.Store({      
        state,
        actions      
      })    
      vuetify = new Vuetify()
    })  
     
    it('renders delete comment dialog', async () => {
        const cancelFn = jest.fn()

        const wrapper = factory({ 
          propsData: {},
          store,
          localVue,
          vuetify ,
          router,
          mock: {
              $route
          },
          methods: {
            cancel: cancelFn
          }   
        })        

        expect(wrapper.find('.v-dialog').exists()).toBe(true)
        
        const cancelBtn = wrapper.find('.v-btn.cancel')
        const proceedBtn = wrapper.find('.v-btn.proceed')

        cancelBtn.trigger('click')
        await localVue.nextTick()
        expect(cancelFn).toHaveBeenCalled()

        proceedBtn.trigger('click')
        await localVue.nextTick()
        expect(actions.deleteComment).toHaveBeenCalled()
        
      
    })
})