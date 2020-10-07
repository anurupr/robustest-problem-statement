/* NOTE: 
   Tests pass with error
    [Vuetify] Multiple instances of Vue detected
    See https://github.com/vuetifyjs/vuetify/issues/4068

    If you're seeing "$attrs is readonly", it's caused by this
 */

import { mount, createLocalVue } from '@vue/test-utils'
import PostBox from '@/components/Social/PostBox'
import { cgravatar } from '@/utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'

import TextBox from '@/components/Common/Input/TextBox'

const localVue = createLocalVue()
localVue.component('text-box', TextBox)
localVue.use(Vuex)
localVue.use(VueRouter)
localVue.use(Vuetify)

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
    let vuetify

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

      vuetify = new Vuetify()
    })

    it('renders postbox', () => {   
        const wrapper = factory({
          propsData: {
            postId: 1
          },
          store,
          localVue,
          vuetify
        });    
        expect(wrapper.find('.post__box').exists()).toBe(true)
    })

    it('nothing happens when content is empty', async () => {   
      const wrapper = factory({
        propsData: {
          postId: 1
        },
        store,
        localVue,
        vuetify
      });
      const event = jest.fn()
      const button = wrapper.find('button')
      button.vm.$on('click', event)
      button.trigger('click')
      await localVue.nextTick()
      expect(event).toHaveBeenCalledTimes(0)      
    })

    it('call addPost action when content is not empty', async () => {   
      const wrapper = factory({
        propsData: {
          postId: 1
        },
        store,
        localVue,
        router,
        vuetify
      });
      wrapper.setData({ content: "This is a post"})
      await localVue.nextTick()
      const button = wrapper.find('button')
      button.trigger('click')    
      await localVue.nextTick()
      expect(actions.addPost).toHaveBeenCalled()
    })

})