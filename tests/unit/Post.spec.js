/* NOTE: 
   Tests pass with error
    [Vuetify] Multiple instances of Vue detected
    See https://github.com/vuetifyjs/vuetify/issues/4068

    If you're seeing "$attrs is readonly", it's caused by this
 */

import { mount, createLocalVue } from '@vue/test-utils'
import { getutime, cgravatar, fromAgo } from '@/utils'
import Vuex from 'vuex'
import Post from '@/components/Social/Post'
import TextBox from '@/components/Common/Input/TextBox'
import Vuetify from 'vuetify'

const localVue = createLocalVue()
localVue.component('text-box', TextBox)
localVue.use(Vuex)
localVue.use(Vuetify)

const factory = (opts = {}) => {
  return mount(Post, opts)
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
};


describe('Post', () => {
  let store
  let state
  let actions
  let vuetify 

  beforeEach(() => {    
    state = {}
    actions = {
      loadComments: jest.fn()
    }
    store = new Vuex.Store({      
      state,
      actions      
    })
    vuetify = new Vuetify()
  })

  it('renders post and calls loadComments action', async () => {            
      const wrapper = factory({ 
        propsData: {          
          post  
        },
        store,
        localVue,
        vuetify
      })
      expect(wrapper.find('.post').exists()).toBe(true)

      // check the field username matches with object passed
      expect(wrapper.find('.field.username').text()).toBe(post.user.name)
      // check the field timestamp is using fromAgo 
      expect(wrapper.find('.field.time').text()).toBe(fromAgo(post.timestamp))

      await localVue.nextTick()
      expect(actions.loadComments).toHaveBeenCalled()

  })

  it('renders editable post and doesn\'t call loadComments action', async () => {
    const wrapper = factory({ 
      propsData: {          
        post,
        editable: true          
      },
      store,
      localVue,
      vuetify
    })

    expect(wrapper.find('.post').exists()).toBe(true)
          

    // check if post is editable
    expect(wrapper.find('input[type=text]').exists()).toBe(true)
    // check if input has same value as the content 
    expect(wrapper.find('input[type=text]').element.value).toBe(post.content)

    await localVue.nextTick()
    expect(actions.loadComments).not.toHaveBeenCalled()
  })

})