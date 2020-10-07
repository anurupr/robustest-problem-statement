/* NOTE: 
   Tests pass with error
    [Vuetify] Multiple instances of Vue detected
    See https://github.com/vuetifyjs/vuetify/issues/4068

    If you're seeing "$attrs is readonly", it's caused by this
 */
import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import ActivityIndicator from '@/components/Common/Interface/ActivityIndicator'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(Vuetify)

const factory = (opts) => {
  if (typeof opts === 'undefined') opts = {}

  return mount(ActivityIndicator, opts)
}

describe('ActivityIndicator', () => {
  it('renders loader', () => {
    const wrapper = factory({ localVue })
    expect(wrapper.find('.v-progress-circular').exists()).toBe(true)
  })
})