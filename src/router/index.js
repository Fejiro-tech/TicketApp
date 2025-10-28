import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../pages/LandingPage.vue'
import Dashboard from '../pages/Dashboard.vue'
import LoginPage from '../pages/LoginPage.vue'
import SignupPage from '../pages/SignupPage.vue'
import TicketPage from '../pages/TicketPage.vue'



const routes = [
    { path: '/', component: LandingPage },
    { path: '/dashboard', component: Dashboard },
    { path: '/login', component: LoginPage },
    { path: '/signup', component: SignupPage },
    { path: '/ticket', component: TicketPage },
    
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router