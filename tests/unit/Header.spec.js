/* NOTE: 
   Tests pass with error
    [Vuetify] Multiple instances of Vue detected
    See https://github.com/vuetifyjs/vuetify/issues/4068

    If you're seeing "$attrs is readonly", it's caused by this
 */

import Vuetify from 'vuetify'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Header from '@/components/Common/Layout/Header'
import Menu from '@/components/Common/Navigation/Menu'

const localVue = createLocalVue()
localVue.use(Vuetify)

const factory = (opts = {}) => {
  return shallowMount(Header, opts)
}

describe('Header', () => {
    let vuetify 

    beforeEach(() => {
      vuetify = new Vuetify()
    })

    it('renders logo', () => {
      const wrapper = factory({
        localVue,
        vuetify
      })

      expect(wrapper.find('.logo').exists()).toBe(true)
    })
    it('renders Menu component', () => {
      const wrapper = factory({
        localVue,
        vuetify
      })
      expect(wrapper.findComponent(Menu).exists()).toBe(true)
    })
})