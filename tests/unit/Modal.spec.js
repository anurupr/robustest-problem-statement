import { mount, createLocalVue } from '@vue/test-utils'
import Vue from 'vue'
import Modal from '@/components/Common/Layout/Modal'


const localVue = createLocalVue()

const factory = (props = {}) => {
  return mount(Modal, {
    propsData: props
  })
}


describe('Modal', () => {
    it('renders modal', () => {
      const wrapper = factory()
      expect(wrapper.find('.modal').exists()).toBe(true)
    })

    it('renders modal but hidden', async  () => {
        const wrapper = factory({
          show: false
        })
        await localVue.nextTick()
        expect(wrapper.find('.modal').attributes().style.indexOf('display: none')).not.toBe(-1)
        
    })

    it('renders modal visible', async  () => {
      const wrapper = factory({
        show: true
      })
      await localVue.nextTick()
      expect(wrapper.find('.modal').attributes().style.indexOf('display')).toBe(-1)
      
  })

})