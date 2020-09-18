import { mount, createLocalVue } from '@vue/test-utils'
import { cgravatar } from '@/utils'
import Vuex from 'vuex'

import Column from '@/components/Common/Layout/Column'
import TextBox from '@/components/Common/Input/TextBox'
import Row from '@/components/Common/Layout/Row'

const localVue = createLocalVue()
localVue.component('column', Column)
localVue.component('row', Row)
localVue.use(Vuex)

const factory = (opts = {}) => {
  return mount(TextBox, opts)
}


describe('TextBox', () => {
  let store
  let state 
  let getters

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
        store
    })
    expect(wrapper.find('.text__box').exists()).toBe(true)

    expect(wrapper.find('textarea').attributes('placeholder')).toBe(pholdertext)

    expect(wrapper.find('textarea').element.value).toBe(value)
  })

})