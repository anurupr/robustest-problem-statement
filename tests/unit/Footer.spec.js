/* NOTE: 
   Tests pass with error
    [Vuetify] Multiple instances of Vue detected
    See https://github.com/vuetifyjs/vuetify/issues/4068

    If you're seeing "$attrs is readonly", it's caused by this
 */

import Vuetify from 'vuetify'
import { mount, createLocalVue } from '@vue/test-utils'
import Footer from '@/components/Common/Layout/Footer'

const localVue = createLocalVue()
localVue.use(Vuetify)

const factory = (opts = {}) => {
  return mount(Footer, opts)
}

describe('Footer', () => {
    let vuetify 

    beforeEach(() => {
      vuetify = new Vuetify()
    })

    it('renders v-footer', () => {
      const wrapper = factory({
        localVue,
        vuetify
      })

      expect(wrapper.find('.v-footer').exists()).toBe(true)
    })
   
})