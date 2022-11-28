import { axios } from "utils/index";

export const getRoleList = (roleName = "", page = 1, limit = 10) => {
  const params: { roleName?: string } = {
    roleName,
  };
  if (!roleName) delete params.roleName;
  return axios.request({
    url: `/admin/system/sysRole/${page}/${limit}`,
    method: "get",
    params,
  });
};

export const deleteRole = (id: string) =>
  axios.request({
    url: `/admin/system/sysRole/remove/${id}`,
    method: "delete",
  });

export const addRole = (data: { roleCode: string; roleName: string }) => {
  return axios.request({
    url: "/admin/system/sysRole/save",
    method: "post",
    data,
  });
};

export const editRole = (data: System.RoleList) => {
  return axios.request({
    url: "/admin/system/sysRole/update",
    method: "post",
    data,
  });
};
// 获取权限列表
export const getAssign = (roleId: string | number) =>
  axios.request({
    url: `/admin/system/sysMenu/toAssign/${roleId}`,
    method: "get",
  });
// 分配角色权限
export const doAssign = (data: {roleIdList: (string | number)[], userId: string | number}) => {
  return axios.request({
    url: '/admin/system/sysRole/doAssign',
    method: 'post',
    data
  })
}
// 获取用户的角色数据
export const toAssign = (userId: string | number) =>
  axios.request({
    url: `/admin/system/sysRole/toAssign/${userId}`,
    method: "get",
  });