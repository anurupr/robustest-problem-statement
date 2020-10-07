
/* NOTE: 
   Tests pass with error
    [Vuetify] Multiple instances of Vue detected
    See https://github.com/vuetifyjs/vuetify/issues/4068

    If you're seeing "$attrs is readonly", it's caused by this
 */

import { mount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'

import NotFound from '@/views/NotFound'

const localVue = createLocalVue()
localVue.use(Vuetify)

const factory = (opts = {}) => {
    return mount(NotFound, opts)
}


describe('NotFound', () => {
    let vuetify = new Vuetify()

    

    it('renders Not Found page', () => {
        const wrapper = factory({
            localVue,
            vuetify
        });
        expect(wrapper.find('p').text()).toBe("Sorry, page doesn't exist")
    })
})