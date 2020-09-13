import Login from '@/views/Login'
import Home from '@/views/Home'
import store from '@/store'

const routes = [
  { path: '/login', name: 'Login', component: Login },
  { path: '/', name: 'Home', component: Home },
  {
    path: '/logout',
    name: 'Logout',
    beforeEnter (to, from, next) {
      store.dispatch('logout')
      next('/')
    }
  }
]

export default routes