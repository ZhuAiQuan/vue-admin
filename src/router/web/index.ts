import { RouteRecordRaw } from 'vue-router';
import Main from 'src/layouts/web.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/web',
    component: Main,
    redirect: '/web/home',
    children: [
      {
        path: 'home',
        component: () => import('views/web/home/index.vue')
      },
      {
        path: 'mine',
        component: () => import('views/web/mine/index.vue')
      }
    ]
  }
];

export default routes