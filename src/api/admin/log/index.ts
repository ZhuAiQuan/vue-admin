import { axios } from "utils/index";

export const loginLog = (page = 1, limit = 10, params: Log.LoginLogParams) =>
  axios.request({
    url: `/admin/system/sysLoginLog/${page}/${limit}`,
    method: "get",
    params
  });

export const operLog = (page = 1, limit = 10, params: Log.OperLogParams) => {
  return axios.request({
    url: `/admin/system/sysOperLog/${page}/${limit}`,
    method: 'get',
    params
  })
}