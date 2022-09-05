import { createRouter, createWebHistory } from 'vue-router'
import signinform from '../components/signinform.vue'
import signupform from '../components/signupform.vue'
import home from '../views/home.vue'
const routes = [
    {
        path: '/',
        name: 'signin',
        component: signinform,
    },
    {
        path: '/signup',
        name: 'signup',
        component: signupform,
    },
    {
        path: '/home',
        name: 'home',
        component: home,
    }

]
const router = createRouter({
    history: createWebHistory(),
    routes,
})
export default router
