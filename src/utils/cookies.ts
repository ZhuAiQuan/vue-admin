import Cookies from 'js-cookie';
import config from 'src/config';
import { encode, decode } from './cryption'

// 存储token
export const setToken = (token: string) => {
  Cookies.set('token', encode(token), { expires: config.expires } )
}

export const getToken = () => {
  return Cookies.get('token') ? decode(Cookies.get('token') as string) : ''
}

export function clearCookies() {
  Cookies.remove('token')
}