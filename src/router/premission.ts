import router from './index';
import { getToken } from 'utils/cookies';
import { notification } from 'ant-design-vue';
import { useUserStore } from 'store/user';
import { asyncRouterFormat } from 'utils/asyncRouter';
import NotFound from 'views/404.vue'

router.beforeEach(async(to, from, next) => {
  const token = getToken();
  const store = useUserStore();

  if (to.path.includes('/admin')) {
    if (!!token) {
      // 判断store里有没有路由
      if (store.routers.length) next()
      else {
        await store.getUserInfo();
        const temp = asyncRouterFormat(store.routers);
        for(let i = 0; i < temp.length; i++) {
          router.addRoute(temp[i]);
        }
        router.addRoute({
          path: '/:error*',
          name: '404',
          component: NotFound
        })
        // 需要浅拷贝to来通知vue更新router数据
        next({ ...to, replace: true })
      }
    } else {
      notification.error({
        message: '温馨提示',
        description: '没有访问权限，请先登录！'
      });
      next(`/login?redirect=${to.path}`)
    }
  } else {
    if(!to.matched.length) {
      // 匹配不到目标路由
      if (to.path === '/404') {
        router.addRoute({
          path: '/:error*',
          name: '404',
          component: NotFound
        })
        next({...to, replace: true})
      } else {
        next('/404')
      }
    }
    next()
  }
})

export default router