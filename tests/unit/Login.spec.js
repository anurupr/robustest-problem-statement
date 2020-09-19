import { mount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

import Login from '@/views/Login'
import Column from '@/components/Common/Layout/Column'
import Row from '@/components/Common/Layout/Row'
import Container from '@/components/Common/Layout/Container'
import Modal from '@/components/Common/Layout/Modal'

const localVue = createLocalVue()
localVue.component('column', Column)
localVue.component('row', Row)
localVue.component('container', Container)
localVue.component('modal', Modal)
localVue.use(VueRouter)
localVue.use(Vuex)

localVue.directive('focus', {
    // When the bound element is inserted into the DOM...
    inserted: function (el) {
      // Focus the element
      el.focus()
    }
  })

const factory = (opts = {}) => {
    return mount(Login, opts)
}

const router = new VueRouter({
    mode: 'history'
  })

describe('Home', () => {
    let store
    let actions

    beforeEach(() => {
        actions = {
            loginRequest: jest.fn()
        }
        store = new Vuex.Store({
            actions
        })
    })

    it('renders login form', () => {
        const wrapper = factory({
          store,
          localVue,
          router
        });
        expect(wrapper.find('form.login').exists()).toBe(true)
    })

    it('validate() returns false if username and password is not set', () => {
        const wrapper = factory({
          store,
          localVue,
          router
        });

        const valid = wrapper.vm.validate()
        expect(valid).toBe(false)

    })

    it('submitting form with username and password calls loginRequest action', async () => {
        // this is required to handle form submissions in jest and vue
        // https://stackoverflow.com/a/53450728/839456
        const div = document.createElement('div')
        div.id = 'root'
        document.body.appendChild(div)

        const wrapper = factory({
          store,
          localVue,
          router,
          attachTo: '#root'
        });

        wrapper.setData({
            username: 'test',
            password: 'test'
        })


        const button = wrapper.find('input[type=submit]')
        button.trigger('click')
        await localVue.nextTick()
        expect(actions.loginRequest).toBeCalled()
        wrapper.destroy()
    })


})