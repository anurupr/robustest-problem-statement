/* NOTE: 
   Tests pass with error
    [Vuetify] Multiple instances of Vue detected
    See https://github.com/vuetifyjs/vuetify/issues/4068

    If you're seeing "$attrs is readonly", it's caused by this
 */

import { mount, createLocalVue } from '@vue/test-utils'
import CommentBox from '@/components/Social/CommentBox'
import { cgravatar } from '@/utils'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import TextBox from '@/components/Common/Input/TextBox'

const localVue = createLocalVue()
localVue.component('text-box', TextBox)
localVue.use(Vuex)
localVue.use(Vuetify)

const factory = (opts = {}) => {
  return mount(CommentBox, opts)
}


describe('CommentBox', () => {
    let actions
    let getters 
    let store
    let vuetify

    beforeEach(() => {
      actions = {
        addComment: jest.fn(),
        addErrorNotif: jest.fn()
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
        getters,
        actions
      })

      vuetify = new Vuetify()
    })

    it('renders commentbox', () => {   
        const wrapper = factory({
          propsData: {
            postId: 1
          },
          store,
          localVue,
          vuetify
        });    
        expect(wrapper.find('.comment__box').exists()).toBe(true)
    })

    it('call addErrorNotif action when content is empty', () => {   
      const wrapper = factory({
        propsData: {
          postId: 1
        },
        store,
        localVue,
        vuetify  
      });
      const button = wrapper.find('button')
      button.trigger('click')    
      expect(actions.addErrorNotif).toHaveBeenCalled()
    })

    it('call addComment action when content is empty', () => {   
      const wrapper = factory({
        propsData: {
          postId: 1
        },
        store,
        localVue,
        vuetify  
      });
      wrapper.setData({ content: "This is a comment"})
      const button = wrapper.find('button')
      button.trigger('click')    
      expect(actions.addComment).toHaveBeenCalled()
    })

})