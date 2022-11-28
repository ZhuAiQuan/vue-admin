import { Base64 } from 'js-base64';

// 输入字符串加密
export const encode = (data: string) => {
  return Base64.encode(`zhuaiquan ${data} romoss`)
}
// 解密
export const decode = (base: string) => {
  return Base64.decode(base).split(' ')[1]
}