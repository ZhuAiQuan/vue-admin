declare namespace System {
  interface UserListData {
    username: string
    phone: string
    id: string
    deptId: number
    name: string
    createTime: string
    updateTime: string
    status: number
  }
  interface MenuListData extends ChangeMenuParams {
    createTime: string
    id: string
    updateTime: string
    children: MenuListData[]
  }
  interface Form {
    component: string
    icon: string
    name: string
    path: string
    status: 0 | 1
    type: 0 | 1 | 2
  }
  interface ChangeMenuParams extends Form {
    id?: string
    parentId?: number | string
  }
  interface AsyncRoutes {
    path: string
    meta: {
      title: string
      icon: string
    }
    component?: any
    redirect: string
    children?: AsyncRoutes[]
  }
  interface RoleList {
    createTime: string
    description: string | null
    id: string
    isDeleted: number
    roleCode: string
    roleName: string
    updateTime: string
  }
  interface RoleMenu {
    id: string | number
    name: string
    select: boolean
    children?: RoleMenu[]
  }
}