/* NOTE: 
   Tests pass with error
    [Vuetify] Multiple instances of Vue detected
    See https://github.com/vuetifyjs/vuetify/issues/4068

    If you're seeing "$attrs is readonly", it's caused by this
 */
import { mount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import CommentMenu from '@/components/Social/CommentMenu'
import VueRouter from 'vue-router'


const localVue = createLocalVue()
localVue.use(Vuetify)
localVue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { 
      name: 'edit-comment',
      path: 'edit-comment/:postId/:id'
    },
    {
      name: 'delete-comment',
      path: 'delete-comment/:postId/:id'
    }
  ],
  mode: 'history'
})


const factory = (opts = {}) => {
  return mount(CommentMenu, opts)
}

const props = {
  postId: 1,
  commentId: 2
}


describe('CommentMenu', () => {
    let vuetify 

    beforeEach(() => {
      vuetify = new Vuetify()
    })

    it('renders comment menu with edit link ', async () => {
        const wrapper = factory({
          propsData: props,
          localVue,
          vuetify,
          router
        })
        const event = jest.fn()
        expect(wrapper.find('.v-menu').exists()).toBe(true)
        
        const button = wrapper.find('.v-btn')        
        button.vm.$on('click', event)

        expect(event).toHaveBeenCalledTimes(0)

        button.trigger('click')
        await localVue.nextTick()

        expect(event).toHaveBeenCalledTimes(1)
        
        expect(wrapper.find('a.edit-comment').attributes().href).toBe(`edit-comment/${props.postId}/${props.commentId}`)
    })

    it('renders comment menu with delete link', async () => {      
      const wrapper = factory({
        propsData: props,
        localVue,
        vuetify,
        router
      })
      const event = jest.fn()
      expect(wrapper.find('.v-menu').exists()).toBe(true)

      const button = wrapper.find('.v-btn')        
      button.vm.$on('click', event)
      expect(event).toHaveBeenCalledTimes(0)

      button.trigger('click')
      await localVue.nextTick()

      expect(event).toHaveBeenCalledTimes(1)
      expect(wrapper.find('a.delete-comment').attributes().href).toBe(`delete-comment/${props.postId}/${props.commentId}`)
    })
})