import { RouteRecordRaw } from 'vue-router';
import Main from 'src/layouts/admin.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/admin',
    component: Main,
    redirect: '/admin/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('views/admin/dashboard/index.vue')
      },
    ]
  }
];

export default routes