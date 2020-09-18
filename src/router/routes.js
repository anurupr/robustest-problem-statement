import Login from '@/views/Login'
import Home from '@/views/Home'
import NotFound from '@/views/NotFound'
import CreatePost from '@/components/Social/CreatePost'
import EditPost from '@/components/Social/EditPost'
import DeletePost from '@/components/Social/DeletePost'
import EditComment from '@/components/Social/EditComment'
import DeleteComment from '@/components/Social/DeleteComment'
import store from '@/store'


const routes = [
  { path: '/login', name: 'Login', component: Login },
  { 
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        name: 'create-post',
        path: 'create-post',
        components: {
          'create-post': CreatePost
        }
      },
      {
        name: 'edit-post',
        path: 'edit-post/:id',
        components: {
          'edit-post': EditPost
        }
      },
      {
        name: 'delete-post',
        path: 'delete-post/:id',
        components: {
          'delete-post': DeletePost
        }
      },
      {
        name: 'edit-comment',
        path: 'edit-comment/:postId/:id',
        components: {
          'edit-comment': EditComment
        }
      },
      {
        name: 'delete-comment',
        path: 'delete-comment/:postId/:id',
        components: {
          'delete-comment': DeleteComment
        }
      }
    ]
  },
  {
    path: '/logout',
    name: 'Logout',
    beforeEnter (to, from, next) {
      store.dispatch('logout')
      next('/')
    }
  },
  {
    // matches everything else  
    path: '*',
    name: 'notFound ',
    component: NotFound
  }
  
]

export default routes