import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import authRotes from "./auth";
import policyRotes from "./policy";
import economyRoutes from "./economy";
import subscriptionRoutes from './subscription';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    ...authRotes,
    ...policyRotes,
    ...economyRoutes,
    ...subscriptionRoutes
  ]
})

export default router
