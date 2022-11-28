import { axios } from "utils/index";

export const menuList = () =>
  axios.request({ url: "/admin/system/sysMenu/findNodes", method: "get" });

export const changeMenu = (data: System.ChangeMenuParams) => {
  return axios.request({
    url: "/admin/system/sysMenu/update",
    method: "post",
    data,
  });
};

export const addMenu = (data: System.ChangeMenuParams) => {
  return axios.request({
    url: "/admin/system/sysMenu/save",
    method: "post",
    data,
  });
};

export const delMenu = (id: number | string) =>
  axios.request({
    url: `/admin/system/sysMenu/remove/${id}`,
    method: "delete",
  });

// 根据角色获取菜单
export const toAssign = (roleId: string) =>
  axios.request({
    url: `/admin/system/sysMenu/toAssign/${roleId}`,
    method: "get",
  });

  // 给角色分配菜单权限
export const doAssign = (data: { roleId: string | number, menuIdList: (string | number)[] }) => 
  axios.request({
    url: '/admin/system/sysMenu/doAssign',
    method: 'post',
    data
  }) 