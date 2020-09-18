import { shallowMount } from '@vue/test-utils'
import Row from '@/components/Common/Layout/Row'

const factory = (props = {}) => {
  return shallowMount(Row, {
    propsData: props
  })
}


describe('Row', () => {
    it('renders row', () => {
      const wrapper = factory()
      expect(wrapper.find('.row').exists()).toBe(true)
    })

   
})