import { axios } from 'utils/index';

export const login = (data: Login.LoginForm) => {
  return axios.request({
    url: '/admin/system/index/login',
    method: 'post',
    data: {
      password: data.password,
      username: data.account
    }
  })
}

export const info = () => {
  return axios.request({
    url: '/admin/system/index/info',
    method: 'get'
  })
}