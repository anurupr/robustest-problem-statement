import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from '@/router/routes'

Vue.use(VueRouter)
const router = new VueRouter({
    routes,
    mode: 'history', // no # in url
})

export default router;