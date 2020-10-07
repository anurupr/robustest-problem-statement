/* NOTE: 
   Tests pass with error
    [Vuetify] Multiple instances of Vue detected
    See https://github.com/vuetifyjs/vuetify/issues/4068

    If you're seeing "$attrs is readonly", it's caused by this
 */

import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import NewsFeed from '@/components/Social/NewsFeed'
import Vuetify from 'vuetify'

const localVue = createLocalVue()
localVue.use(Vuetify)
localVue.use(Vuex)

const factory = (opts = {}) => {  
  return shallowMount(NewsFeed, opts)
}

describe('NewsFeed', () => {
  let actions
  let store
  let state
  let vuetify


  beforeEach(() => {
    actions = {
      loadPosts: jest.fn(),
      setInit: jest.fn()
    }
    state = {
      posts: []
    }

    store = new Vuex.Store({
      actions,
      state
    })

    vuetify = new Vuetify()
    
  })

  it('renders news feed', () => {
      const wrapper = factory({ store, localVue, vuetify })
      expect(wrapper.find('#newsfeed').exists()).toBe(true) 
  })

  it('renders news feed with action loadPosts called', async  () => {
    const wrapper = factory({ store, localVue, vuetify })
    expect(wrapper.find('#newsfeed').exists()).toBe(true) 
    await localVue.nextTick()
    expect(actions.loadPosts).toHaveBeenCalled()
    
  })

  


})