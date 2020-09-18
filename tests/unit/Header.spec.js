import { shallowMount } from '@vue/test-utils'
import Header from '@/components/Common/Layout/Header'
import Menu from '@/components/Common/Navigation/Menu'

const factory = () => {
  return shallowMount(Header, {})
}

describe('Header', () => {
    it('renders logo', () => {
      const wrapper = factory()
      expect(wrapper.find('.logo').exists()).toBe(true)
    })
    it('renders Menu component', () => {
      const wrapper = factory()
      expect(wrapper.findComponent(Menu).exists()).toBe(true)
    })
})