/* NOTE: 
   Tests pass with error
    [Vuetify] Multiple instances of Vue detected
    See https://github.com/vuetifyjs/vuetify/issues/4068

    If you're seeing "$attrs is readonly", it's caused by this
 */

import { mount, createLocalVue } from '@vue/test-utils'
import { cgravatar } from '@/utils'
import Vuex from 'vuex'

import TextBox from '@/components/Common/Input/TextBox'
import Vuetify from 'vuetify'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(Vuetify)

const factory = (opts = {}) => {
  return mount(TextBox, opts)
}


describe('TextBox', () => {
  let store
  let state 
  let getters
  let vuetify

  beforeEach(() => {
    state = {
      isLoggedIn: false
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
      getters
    })

    vuetify = new Vuetify()
  })

  it('renders default textbox with placeholder', () => {
    const pholdertext = "This is a placeholder";      
    const value = 'hi'
    const wrapper = factory({       
        propsData: {
          pholder: pholdertext,
          value
        },
        localVue,
        store,
        vuetify
    })
    expect(wrapper.find('.v-textarea').exists()).toBe(true)    
    expect(wrapper.find('.v-textarea textarea').attributes('placeholder')).toBe(pholdertext)

    expect(wrapper.find('.v-textarea textarea').element.value).toBe(value)
  })

})