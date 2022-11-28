import { loginLog, operLog } from "api/admin/log";
import { reactive } from "vue";
import type { ColumnsType } from 'ant-design-vue/es/table/interface';

interface LoginTable {
  columns: ColumnsType<Log.LoginData>
  data: Log.LoginData[]
}
interface OperTable {
  data: Log.OperData[]
  columns: ColumnsType<Log.OperData>
}
interface Preview {
  show: boolean
  data: Log.OperData | undefined
}
export default function () {
  const pagination = reactive({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const loginParams = reactive({
    username: ''
  })
  const operParams = reactive({
    operName: '',
    title: ''
  })
  const commonParams = reactive({
    createTimeBegin: '',
    createTimeEnd: ''
  })
  const loginTable = reactive<LoginTable>({
    columns: [
      {
        title: '用户名',
        dataIndex: 'username',
        key: 'username'
      },
      {
        title: 'ip',
        dataIndex: 'ipaddr',
        key: 'ipaddr'
      },
      {
        title: '登录时间',
        dataIndex: 'createTime',
        key: 'createTime'
      },
      {
        title: '信息',
        dataIndex: 'msg',
        key: 'msg'
      }
    ],
    data: []
  });
  const operTable = reactive<OperTable>({
    columns: [
      {
        title: '操作用户',
        dataIndex: 'operName'
      },
      {
        title: '操作模块',
        dataIndex: 'title'
      },
      {
        title: '请求api',
        dataIndex: 'operUrl'
      },
      {
        title: '请求方式',
        dataIndex: 'requestMethod'
      },
      {
        title: 'ip',
        dataIndex: 'operIp'
      },
      {
        title: '操作',
        dataIndex: 'actions'
      }
    ],
    data: []
  });
  const preview = reactive<Preview>({
    show: false,
    data: undefined
  })
  const obj = {
    getLoginLog,
    getOperLog
  }

  function getLoginLog() {
    loginLog(pagination.current, pagination.pageSize, Object.assign(loginParams, commonParams)).then(({ data: result }) => {
      const { code, data, message: msg } = result;
      if (+code === 200) {
        const { records, total } = data as { records: Log.LoginData[], total: number };
        pagination.total = total;
        loginTable.data = records;
      } else {
        loginTable.data = [];
        pagination.current = 1;
        pagination.pageSize = 10;
        pagination.total = 0
      }
    })
  }
  function getOperLog() {
    operLog(pagination.current, pagination.pageSize, Object.assign(operParams, commonParams)).then(({ data: result }) => {
      const { data, code, message: msg } = result;
      if (+code === 200) {
        const { records, total } = data as { records: Log.OperData[], total: number };
        pagination.total = total;
        operTable.data = records;
      } else {
        operTable.data = [];
        pagination.current = 1;
        pagination.pageSize = 10;
        pagination.total = 0
      }
    })
  }

  function onChange(page: number, pageSize: number, func: keyof typeof obj) {
    pagination.current = page;
    pagination.pageSize = pageSize;
    obj[func]();
  }

  function onReset(func: keyof typeof obj) {
    pagination.current = 1;
    pagination.pageSize = 10;
    pagination.total = 0

    commonParams.createTimeBegin = '';
    commonParams.createTimeEnd = '';

    if (func === 'getLoginLog') {
      loginParams.username = ''
    } else {
      operParams.operName = '';
      operParams.title = ''
    }

    obj[func]()
  }
  // SEC88c4a27df674e8164cfe27b128b3f5831d15daa3d97d53b345796835f3529efa
  // https://oapi.dingtalk.com/robot/send?access_token=a741e65ae4f9408eeddd115181253153e4fad90c5d4b8c26e86802e12f14a80f
  function onPreview(row: Log.OperData) {
    preview.data = row;
    preview.show = true;
  }
  return {
    getLoginLog,
    loginTable,
    onChange,
    pagination,
    loginParams,
    commonParams,
    onReset,
    getOperLog,
    operTable,
    operParams,
    onPreview,
    preview
  };
}
