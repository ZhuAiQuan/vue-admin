import { createRouter, RouteRecordRaw, createWebHistory } from 'vue-router';
import admin from './admin/index';
import web from './web/index'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/web'
  },
  {
    path: '/login',
    component: () => import('views/admin/login/index.vue')
  },
  ...web,
  ...admin,
]

const router = createRouter({
  routes,
  history: createWebHistory(import.meta.env.BASE_URL)
})

export default router