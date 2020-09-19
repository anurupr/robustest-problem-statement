import { mount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

import Home from '@/views/Home'
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

const router = new VueRouter({
    mode: 'history'
  })

describe('Home', () => {
    let store
    let state

    beforeEach(() => {
        state = {
            isLoggedIn: false,
            posts: []
        }

        store = new Vuex.Store({
            state
        })
    })

    it('renders container', () => {
        const wrapper = factory({
          store,
          localVue,
          router
        });
        console.log(wrapper.html())
        expect(wrapper.find('.container').exists()).toBe(true)
    })


})