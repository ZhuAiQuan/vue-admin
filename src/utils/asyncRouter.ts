import Main from 'src/layouts/admin.vue'
const modules = import.meta.glob('../views/admin/**/*.vue');

export const asyncRouterFormat = (temp: Login.Routers[]) => {
  return temp.map((item) => {
    
    const routes: System.AsyncRoutes = {
      path: item.path,
      meta: item.meta,
      redirect: '',
      component: Main
    };
    if (item.component && item.component !== 'Layout') {
      routes.component = modules[`../views/admin/${item.component}.vue`]
    } else {
      routes.redirect = item.children?.length ? item.children[0].path : '';
    }
    if (item.children?.length) {
      routes.children = asyncRouterFormat(item.children)
    }

    return routes
  })
}