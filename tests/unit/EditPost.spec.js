/* NOTE: 
   Tests pass with error
    [Vuetify] Multiple instances of Vue detected
    See https://github.com/vuetifyjs/vuetify/issues/4068

    If you're seeing "$attrs is readonly", it's caused by this
 */

import { mount, createLocalVue } from '@vue/test-utils'
import { getutime, cgravatar } from '@/utils'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'

import EditPost from '@/components/Social/EditPost'
import TextBox from '@/components/Common/Input/TextBox'
import Post from '@/components/Social/Post'
import Modal from '@/components/Common/Layout/Modal'

const localVue = createLocalVue()
localVue.component('modal', Modal)
localVue.component('text-box', TextBox)
localVue.use(Vuex)
localVue.use(Vuetify)
localVue.use(VueRouter)

const factory = (opts = {}) => {
    return mount(EditPost, opts)
}

const router = new VueRouter({
    mode: 'history'
})

const $route = {
    params: {
        id: 2
    }
}
  
const post = {
    id: + new Date(),
    content: "Lorem ipsum",
    user : {
      id: 1,
      username: 'rtester',
      name: 'Robus Tester',
      email: 'robustester@gmail.com',
      location: 'Bangalore, India',
      gravatar: cgravatar('robustester@gmail.com')
    },
    timestamp: getutime()
  }

describe('EditPost', () => {
    let store
    let state
    let actions
    let getters
    let vuetify
  
    beforeEach(() => {    
      state = {}
      actions = {
        modalVisible: jest.fn(),
        getPost: jest.fn()
      }
      getters = {
        getCurrentUser: () => {
          return {
            id: 1,
            username: 'rtester',
            name: 'Robus Tester',
            email: 'robustester@gmail.com',
            location: 'Bangalore, India',
            gravatar: cgravatar('robustester@gmail.com')
          }
        }
      }
      store = new Vuex.Store({      
        state,
        actions,
        getters
      })    
      vuetify = new Vuetify()
    })
  
    
      
  
    it('renders edit post dialog', async () => {
        const wrapper = factory({ 
          propsData: {},
          store,
          localVue,
          vuetify ,
          router,
          mock: {
              $route
          }     
        })        
        await localVue.nextTick()        
        expect(actions.getPost).toHaveBeenCalled()
        await localVue.nextTick()
        wrapper.setData({ post })
        await localVue.nextTick()
        
        expect(wrapper.find('.v-dialog').exists()).toBe(true)
        expect(wrapper.findComponent(Post).exists()).toBe(true)
      
    })
})