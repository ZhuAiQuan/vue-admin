import { defineStore } from "pinia";
import { getToken, setToken, clearCookies } from "utils/cookies";
import { login, info } from "api/login";
import { message } from "ant-design-vue";
import { asyncRouterFormat } from 'utils/asyncRouter';
import router from 'src/router'

export const useUserStore = defineStore("user", {
  state: (): Store.UserState => {
    return {
      token: getToken(),
      avatar: "",
      buttons: [],
      roles: "",
      routers: [],
      name: "",
    };
  },
  getters: {
    getToken: (state) => {
      return state.token;
    },
    getMenu: (state) => [{ path: '/admin/dashboard', meta: { title: '首页' } } , ...state.routers]
  },
  actions: {
    async onLogin(params: Login.LoginForm) {
      // 可以通过this获取state数据，没有Mutations 可以直接更改state
      const {
        data: { data, code, message: msg },
      } = await login(params);
      if (+code === 200) {
        const { token } = data as Login.ResponseData;
        setToken(token);
        this.token = token;
      } else {
        message.error(msg);
      }
    },
    async getUserInfo() {
      const {
        data: { code, data, message: msg },
      } = await info();
      if (+code === 200) {
        const { avatar, buttons, roles, routers, name } =
          data as Login.UserInfo;
        this.$patch({ avatar, buttons, roles, routers, name });
        asyncRouterFormat(routers);
        return routers
      } else {
        message.error(msg);
      }
    },
    onLoginOut() {
      clearCookies();
      router.replace('/login')
    }
  },
});
