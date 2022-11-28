import { axios } from "utils/index";
type FormKey = 'name' | 'password' | 'phone' | 'username';

export const userList = (page = 1, limit = 10) => {
  return axios.request({
    url: `/admin/system/sysUser/${page}/${limit}`,
    method: "get",
  });
};

export const changeState = (id: string, status: number) =>
  axios.request({
    url: `/admin/system/sysUser/updateStatus/${id}/${status}`,
    method: "get",
  });

export const add = (data: Record<FormKey, string>) =>
  axios.request({
    url: '/admin/system/sysUser/save',
    method: 'post',
    data
  })

export const edit = (data: Record<FormKey, string> & Record<'id', string>) =>
  axios.request({
    url: '/admin/system/sysUser/update',
    method: 'post',
    data
  })

export const deleteUser = (id: string) =>
  axios.request({
    url: `/admin/system/sysUser/remove/${id}`,
    method: 'delete'
  })

export const roleList = (id: string, roleList: string[]) =>
  axios.request({
    url: '/admin/system/sysUser/update',
    method: 'post',
    data: {
      id,
      roleList
    }
  })