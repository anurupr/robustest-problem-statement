import { mount, createLocalVue } from '@vue/test-utils'
import { getutime, cgravatar, fromAgo } from '@/utils'
import Vuex from 'vuex'
import Comment from '@/components/Social/Comment'
import TextBox from '@/components/Common/Input/TextBox'
import Column from '@/components/Common/Layout/Column'
import Row from '@/components/Common/Layout/Row'

const localVue = createLocalVue()
localVue.component('text-box', TextBox)
localVue.component('column', Column)
localVue.component('row', Row)
localVue.use(Vuex)

const factory = (opts = {}) => {
  return mount(Comment, opts)
}

describe('Comment', () => {
  let store
  let state

  beforeEach(() => {    
    state = {}
    store = new Vuex.Store({      
      state
    })
    
  })

  const comment = {
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

  it('renders comment', () => {
      const wrapper = factory({ 
        propsData: {          
          comment  
        },
        store,
        localVue
      })
      expect(wrapper.find('.comment').exists()).toBe(true)

      
    // check the field username matches with object passed
    expect(wrapper.find('.field.username').text()).toBe(comment.user.name)
    // check the field timestamp is using fromAgo 
    expect(wrapper.find('.field.time').text()).toBe(fromAgo(comment.timestamp))

  })

  it('renders editable comment', () => {
      const wrapper = factory({ 
        propsData: {          
          comment,
          editable: true          
        },
        store,
        localVue
      })

      expect(wrapper.find('.comment').exists()).toBe(true)
            

      // check if comment is editable
      expect(wrapper.find('input[type=text]').exists()).toBe(true)
      // check if input has same value as the content 
      expect(wrapper.find('input[type=text]').element.value).toBe(comment.content)
  })

})