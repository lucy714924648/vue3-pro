import { createRouter, createWebHistory } from 'vue-router'

import Layout from '../views/Layout/index.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: Layout,
      children: [{
        path: '',
        name: 'home',
        component: () => import('../views/Home/index.vue'),
      },
      {
        path: '/category',
        name: 'category',
        component: () => import('../views/Category/index.vue'),
      }]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import("../views/Login/index.vue"),
    },
  ],
})

export default router
