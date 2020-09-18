import { mount, createLocalVue } from '@vue/test-utils'
import PostMenu from '@/components/Social/PostMenu'
import VueRouter from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


const localVue = createLocalVue()
localVue.component('font-awesome-icon', FontAwesomeIcon)
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
    it('renders post menu with edit link ', () => {
        const wrapper = factory({
          propsData: props,
          localVue,
          router
        })
        expect(wrapper.find('ul.floating').exists()).toBe(true)
        expect(wrapper.find('a.edit').attributes().href).toBe(`edit-post/${props.postId}`)
    })

    it('renders post menu with delete link', () => {      
      const wrapper = factory({
        propsData: props,
        localVue,
        router
      })
      expect(wrapper.find('ul.floating').exists()).toBe(true)
      expect(wrapper.find('a.delete').attributes().href).toBe(`delete-post/${props.postId}`)
  })
})