import { shallowMount } from '@vue/test-utils'
import Container from '@/components/Common/Layout/Container'

const factory = (props = {}) => {
  return shallowMount(Container, {
    propsData: props
  })
}


describe('Container', () => {
    it('renders container', () => {
      const wrapper = factory()
      expect(wrapper.find('.container').exists()).toBe(true)
    })
})