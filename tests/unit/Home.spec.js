/* NOTE: 
   Tests pass with error
    [Vuetify] Multiple instances of Vue detected
    See https://github.com/vuetifyjs/vuetify/issues/4068

    If you're seeing "$attrs is readonly", it's caused by this
 */
import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import Vuetify from 'vuetify'

import Home from '@/views/Home'
import NewsFeed from '@/components/Social/NewsFeed'

const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(Vuex)
localVue.use(Vuetify)

const factory = (opts = {}) => {
    return mount(Home, opts)
}

const sfactory = (opts = {}) => {
    return shallowMount(Home, opts)
}

const router = new VueRouter({
    mode: 'history'
  })

describe('Home', () => {
    let store
    let state
    let actions
    let vuetify

    beforeEach(() => {
        state = {
            isLoggedIn: false,
            posts: []
        }

        actions = {
            loadPosts: jest.fn(),
            setInit: jest.fn()
        }

        store = new Vuex.Store({
            state,
            actions
        })

        vuetify = new Vuetify()
    })

    it('renders container (shallowMount) without NewsFeed Component rendered - loadPosts not called', () => {
        const wrapper = sfactory({
            store,
            localVue,
            vuetify
        })
        // container component will not be rendered, there will only be a stub
        expect(wrapper.find('.v-container').exists()).toBe(false)        
        
    })

    it('renders container (mount) with NewsFeed component and action loadPosts should be called', async () => {
        const wrapper = factory({
          store,
          localVue,
          router,
          vuetify
        });
        expect(wrapper.find('.container').exists()).toBe(true)
        expect(wrapper.findComponent(NewsFeed).exists()).toBe(true)
        await localVue.nextTick()
        expect(actions.loadPosts).toHaveBeenCalled()
    })
})