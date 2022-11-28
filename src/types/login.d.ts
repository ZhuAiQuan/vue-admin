declare namespace Login {
  type LoginForm = {
    account: string
    password: string
  }
  interface ResponseData {
    token: string
  }
  interface UserInfo {
    avatar: string
    roles: string
    name: string
    buttons: string[]
    routers: Routers[]
  }
  interface Routers {
    path: string
    meta: {
      icon: string
      title: string
    }
    hidden: boolean
    component: string
    alwaysShow: boolean
    children?: Routers[]
  }
}