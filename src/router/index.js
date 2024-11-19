import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import authRotes from "./auth";
import policyRotes from "./policy";
import financeRoutes from "./finance";
import subscriptionRoutes from './subscription';
import staticRoutes from './staticRoutes';

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
    ...financeRoutes,
    ...subscriptionRoutes,
    ...staticRoutes,
  ]
})

export default router
