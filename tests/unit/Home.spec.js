import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

import Home from '@/views/Home'
import NewsFeed from '@/components/Social/NewsFeed'
import Column from '@/components/Common/Layout/Column'
import Row from '@/components/Common/Layout/Row'
import Container from '@/components/Common/Layout/Container'

const localVue = createLocalVue()
localVue.component('column', Column)
localVue.component('row', Row)
localVue.component('container', Container)
localVue.use(VueRouter)
localVue.use(Vuex)

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

    beforeEach(() => {
        state = {
            isLoggedIn: false,
            posts: []
        }

        actions = {
            loadPosts: jest.fn()
        }

        store = new Vuex.Store({
            state,
            actions
        })
    })

    it('renders container (shallowMount) without NewsFeed Component rendered - loadPosts not called', () => {
        const wrapper = sfactory({
            store,
            localVue,
            // router
        })
        // container component will not be rendered, there will only be a stub
        expect(wrapper.find('.container').exists()).toBe(false)
        // use findComponent instead
        expect(wrapper.findComponent(Container).exists()).toBe(true)
    })

    it('renders container (mount) with NewsFeed component and action loadPosts should be called', async () => {
        const wrapper = factory({
          store,
          localVue,
          router
        });
        expect(wrapper.find('.container').exists()).toBe(true)
        expect(wrapper.findComponent(NewsFeed).exists()).toBe(true)
        await localVue.nextTick()
        expect(actions.loadPosts).toHaveBeenCalled()
    })
})