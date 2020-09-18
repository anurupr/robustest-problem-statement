import { mount, createLocalVue } from '@vue/test-utils'
import CommentMenu from '@/components/Social/CommentMenu'
import VueRouter from 'vue-router'


const localVue = createLocalVue()
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
    it('renders comment menu with edit link ', () => {
        const wrapper = factory({
          propsData: props,
          localVue,
          router
        })
        expect(wrapper.find('ul.floating').exists()).toBe(true)
        expect(wrapper.find('a.edit').attributes().href).toBe(`edit-comment/${props.postId}/${props.commentId}`)
    })

    it('renders comment menu with delete link', () => {      
      const wrapper = factory({
        propsData: props,
        localVue,
        router
      })
      expect(wrapper.find('ul.floating').exists()).toBe(true)
      expect(wrapper.find('a.delete').attributes().href).toBe(`delete-comment/${props.postId}/${props.commentId}`)
  })
})