/* NOTE: 
   Tests pass with error
    [Vuetify] Multiple instances of Vue detected
    See https://github.com/vuetifyjs/vuetify/issues/4068

    If you're seeing "$attrs is readonly", it's caused by this
 */
import { mount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import Vuetify from 'vuetify'

import Login from '@/views/Login'
import Modal from '@/components/Common/Layout/Modal'

const localVue = createLocalVue()
localVue.component('modal', Modal)
localVue.use(VueRouter)
localVue.use(Vuex)
localVue.use(Vuetify)

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
    let vuetify

    beforeEach(() => {
        actions = {
            loginRequest: jest.fn(),
            modalVisible: jest.fn(),
            addNotif: jest.fn()
        }
        store = new Vuex.Store({
            actions
        })

        vuetify = new Vuetify()
    })

    it('renders login form', () => {
        const wrapper = factory({
          store,
          localVue,
          router,
          vuetify
        });
        expect(wrapper.find('form.login').exists()).toBe(true)
    })

    it('validate() returns false if username and password is not set', () => {
        const wrapper = factory({
          store,
          localVue,
          router,
          vuetify
        });

        const valid = wrapper.vm.$refs.form.validate()
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
          attachTo: '#root',
          vuetify          
        });

        wrapper.setData({
            username: 'test',
            password: 'test'
        })
        await localVue.nextTick()        
        
        const button = wrapper.find('button[type=submit]')
        const event = jest.fn()

        button.vm.$on('click', event)
        expect(event).toHaveBeenCalledTimes(0)
        button.trigger('click')        
        await localVue.nextTick()
        expect(event).toHaveBeenCalledTimes(1)

   
        await expect(actions.loginRequest).toBeCalled()
        wrapper.destroy()
    })


})