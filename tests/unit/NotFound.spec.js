import { mount, createLocalVue } from '@vue/test-utils'

import NotFound from '@/components/Common/Navigation/NotFound'
import Column from '@/components/Common/Layout/Column'
import Row from '@/components/Common/Layout/Row'

const localVue = createLocalVue()
localVue.component('column', Column)
localVue.component('row', Row)
const factory = (opts = {}) => {
    return mount(NotFound, opts)
}


describe('NotFound', () => {
    it('renders Not Found page', () => {   
        const wrapper = factory({
            localVue
        });    
        expect(wrapper.find('p').text()).toBe("Sorry, page doesn't exist")
    })
})