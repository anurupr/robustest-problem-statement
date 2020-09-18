import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import NewsFeed from '@/components/Social/NewsFeed'

const localVue = createLocalVue()
localVue.use(Vuex)

const factory = (opts = {}) => {  
  return shallowMount(NewsFeed, opts)
}

describe('NewsFeed', () => {
  let actions
  let store
  let state

  beforeEach(() => {
    actions = {
      loadPosts: jest.fn()      
    }
    state = {
      posts: []
    }

    store = new Vuex.Store({
      actions,
      state
    })
    
  })

  it('renders news feed', () => {
      const wrapper = factory({ store, localVue })
      expect(wrapper.find('#newsfeed').exists()).toBe(true) 
  })

  it('renders news feed with action loadPosts called', async  () => {
    const wrapper = factory({ store, localVue })
    expect(wrapper.find('#newsfeed').exists()).toBe(true) 
    await localVue.nextTick()
    expect(actions.loadPosts).toHaveBeenCalled()
    
  })

  


})