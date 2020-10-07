/* NOTE: 
   Tests pass with error
    [Vuetify] Multiple instances of Vue detected
    See https://github.com/vuetifyjs/vuetify/issues/4068

    If you're seeing "$attrs is readonly", it's caused by this
 */
import { mount, createLocalVue } from '@vue/test-utils'
import { getutime, cgravatar, fromAgo } from '@/utils'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import Comment from '@/components/Social/Comment'
import TextBox from '@/components/Common/Input/TextBox'

const localVue = createLocalVue()
localVue.component('text-box', TextBox)
localVue.use(Vuex)
localVue.use(Vuetify)


const factory = (opts = {}) => {
  return mount(Comment, opts)
}


describe('Comment', () => {
  let store
  let state
  let vuetify

  beforeEach(() => {    
    state = {}
    store = new Vuex.Store({      
      state
    })    
    vuetify = new Vuetify()
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
        localVue,
        vuetify        
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
        localVue,
        vuetify
      })

      expect(wrapper.find('.comment').exists()).toBe(true)
            

      // check if comment is editable
      expect(wrapper.find('input[type=text]').exists()).toBe(true)
      // check if input has same value as the content 
      expect(wrapper.find('input[type=text]').element.value).toBe(comment.content)
  })

  it('renders comment (in mobile mode)', () => {
    const wrapper = factory({ 
      propsData: {          
        comment,
        editable: false          
      },
      store,
      localVue,
      vuetify, 
      mocks: {
        $vuetify: {
          breakpoint : {
            mobile: true
          }
        }
      }
    })

    expect(wrapper.find('.comment').exists()).toBe(true)
          

    // check if comment is in mobile mode    
    expect(wrapper.find('.content-container').classes('pa-0')).toBe(true)
})

})