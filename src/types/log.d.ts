declare namespace Log {
  interface LoginLogParams extends CommonParmas {
    username?: string
  }
  interface OperLogParams extends CommonParmas {
    operName?: string
    title?: string
  }
  interface CommonParmas {
    createTimeBegin?: string
    createTimeEnd?: string
  }
  interface LoginData {
    id: string | number
    createTime: string
    ipaddr: string
    isDeleted: 0 | 1
    msg: string
    status: 0 | 1
    username: string
  }
  interface OperData {
    businessType: string
    createTime: string
    id: string
    jsonResult: string
    method: string
    isDeleted: 0 | 1
    operName: string
    operUrl: string
    operatorType: string
    requestMethod: string
    status: number
    title: string
    operParam: string
  }
}