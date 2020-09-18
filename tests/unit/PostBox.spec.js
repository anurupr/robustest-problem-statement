import { mount, createLocalVue } from '@vue/test-utils'
import PostBox from '@/components/Social/PostBox'
import { cgravatar } from '@/utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

import TextBox from '@/components/Common/Input/TextBox'
import Column from '@/components/Common/Layout/Column'
import Row from '@/components/Common/Layout/Row'


const localVue = createLocalVue()
localVue.component('text-box', TextBox)
localVue.component('column', Column)
localVue.component('row', Row)
localVue.use(Vuex)
localVue.use(VueRouter)

const factory = (opts = {}) => {
  return mount(PostBox, opts)
}

const router = new VueRouter({
  mode: 'history'
})

describe('CommentBox', () => {
    let actions
    let getters 
    let store

    beforeEach(() => {
      actions = {
        addPost: jest.fn(),
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
    })

    it('renders postbox', () => {   
        const wrapper = factory({
          propsData: {
            postId: 1
          },
          store,
          localVue
        });    
        expect(wrapper.find('.text__box').exists()).toBe(true)
    })

    it('call addErrorNotif action when content is empty', () => {   
      const wrapper = factory({
        propsData: {
          postId: 1
        },
        store,
        localVue
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
        router
      });
      wrapper.setData({ content: "This is a post"})
      const button = wrapper.find('button')
      button.trigger('click')    
      expect(actions.addPost).toHaveBeenCalled()
    })

})