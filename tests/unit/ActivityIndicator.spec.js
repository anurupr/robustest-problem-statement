import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import ActivityIndicator from '@/components/Common/Interface/ActivityIndicator'

const localVue = createLocalVue()
localVue.use(Vuex)

const factory = (opts) => {
  if (typeof opts === 'undefined') opts = {}

  return shallowMount(ActivityIndicator, opts)
}

describe('ActivityIndicator', () => {
  it('renders loader', () => {
    const wrapper = factory()
    expect(wrapper.find('.loader').exists()).toBe(true)
  })
})