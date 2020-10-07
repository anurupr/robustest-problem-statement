/* NOTE: 
   Tests pass with error
    [Vuetify] Multiple instances of Vue detected
    See https://github.com/vuetifyjs/vuetify/issues/4068

    If you're seeing "$attrs is readonly", it's caused by this
 */

import { mount, createLocalVue } from '@vue/test-utils'
import PostMenu from '@/components/Social/PostMenu'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'

const localVue = createLocalVue()
localVue.use(Vuetify)
localVue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { 
      name: 'edit-post',
      path: 'edit-post/:id'
    },
    {
      name: 'delete-post',
      path: 'delete-post/:id'
    }
  ],
  mode: 'history'
})


const factory = (opts = {}) => {
  return mount(PostMenu, opts)
}

const props = {
  postId: 1
}


describe('PostMenu', () => {
    let vuetify

    beforeEach(() => {
      vuetify = new Vuetify()
    })

    it('renders post menu with edit link ', async () => {
        const wrapper = factory({
          propsData: props,
          localVue,
          router,
          vuetify
        })
        const event = jest.fn()
        expect(wrapper.find('.v-menu').exists()).toBe(true)
        
        const button = wrapper.find('.v-btn')        
        button.vm.$on('click', event)

        expect(event).toHaveBeenCalledTimes(0)

        button.trigger('click')
        await localVue.nextTick()

        expect(event).toHaveBeenCalledTimes(1)
        expect(wrapper.find('a.edit-post').attributes().href).toBe(`edit-post/${props.postId}`)
    })

    it('renders post menu with delete link', async () => {      
      const wrapper = factory({
        propsData: props,
        localVue,
        router,
        vuetify
      })
      
      const event = jest.fn()
      expect(wrapper.find('.v-menu').exists()).toBe(true)
      
      const button = wrapper.find('.v-btn')        
      button.vm.$on('click', event)

      expect(event).toHaveBeenCalledTimes(0)

      button.trigger('click')
      await localVue.nextTick()

      expect(event).toHaveBeenCalledTimes(1)
      expect(wrapper.find('a.delete-post').attributes().href).toBe(`delete-post/${props.postId}`)
  })
})