/* NOTE: 
   Tests pass with error
    [Vuetify] Multiple instances of Vue detected
    See https://github.com/vuetifyjs/vuetify/issues/4068

    If you're seeing "$attrs is readonly", it's caused by this
 */

import { mount, createLocalVue } from '@vue/test-utils'
import { cgravatar } from '@/utils'
import Vuex from 'vuex'
import Vuetify from 'vuetify'

import CreatePost from '@/components/Social/CreatePost'
import TextBox from '@/components/Common/Input/TextBox'
import PostBox from '@/components/Social/PostBox'
import Modal from '@/components/Common/Layout/Modal'

const localVue = createLocalVue()
localVue.component('modal', Modal)
localVue.component('text-box', TextBox)
localVue.use(Vuex)
localVue.use(Vuetify)

const factory = (opts = {}) => {
    return mount(CreatePost, opts)
  }
  

describe('CreatePost', () => {
    let store
    let state
    let actions
    let getters
    let vuetify
  
    beforeEach(() => {    
      state = {}
      actions = {
        modalVisible: jest.fn()
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
  
    it('renders create post dialog', () => {
        const wrapper = factory({
          store,
          localVue,
          vuetify        
        })
        expect(wrapper.find('.v-dialog').exists()).toBe(true)
        expect(wrapper.findComponent(PostBox).exists()).toBe(true)
      
    })
})