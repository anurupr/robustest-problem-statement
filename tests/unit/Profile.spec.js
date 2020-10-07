/* NOTE: 
   Tests pass with error
    [Vuetify] Multiple instances of Vue detected
    See https://github.com/vuetifyjs/vuetify/issues/4068

    If you're seeing "$attrs is readonly", it's caused by this
 */

import Vuetify from 'vuetify'
import { mount, createLocalVue } from '@vue/test-utils'
import Profile from '@/components/User/Profile'
import Vuex from 'vuex'
import { cgravatar } from '@/utils'

const localVue = createLocalVue()
localVue.use(Vuetify)
localVue.use(Vuex)

const factory = (opts = {}) => {
  return mount(Profile, opts)
}

<<<<<<< HEAD
=======
// https://vue-test-utils.vuejs.org/guides/common-tips.html#mocking-transitions
const transitionStub = () => ({
    render: function(h) {
      return this.$options._renderChildren
    }
  })
  

>>>>>>> 3d900fdc12fbf0b38063d536f660c9bbbb86dd5f
describe('Profile', () => {
    let vuetify
    let getters 
    let store

    beforeEach(() => {
      vuetify = new Vuetify()

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
          getters
      })
    })

    it('renders profile with avatar', async () => {
      const wrapper = factory({
        localVue,
        vuetify,
        store
      })

      expect(wrapper.find('.profile').exists()).toBe(true)
      expect(wrapper.find('.v-avatar').exists()).toBe(true)
      // TODO test with avatar image
    })
   
})