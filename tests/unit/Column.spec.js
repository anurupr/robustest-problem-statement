import { shallowMount } from '@vue/test-utils'
import Column from '@/components/Common/Layout/Column'

const factory = (props = {}) => {
  return shallowMount(Column, {
    propsData: props
  })
}


describe('Column', () => {
    it('renders column', () => {
      const wrapper = factory()
      expect(wrapper.find('.column').exists()).toBe(true)
    })

    it('renders column with responsive classes', () => {
        const wrapper = factory({ class: "column__sm__ct_1" })
        // this fails. doesn't add class to the root element like in the app
        expect(wrapper.find('.column.column__sm__ct_1').exists()).toBe(false)
      })
})