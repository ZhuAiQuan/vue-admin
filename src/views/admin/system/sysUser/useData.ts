import {
  userList,
  changeState,
  add,
  edit,
  deleteUser,
  roleList,
} from "api/admin/system/user";
import { toAssign, doAssign } from "api/admin/system/role";
import { reactive, onMounted } from "vue";
import type { ColumnsType } from "ant-design-vue/es/table/interface";
import { message } from "ant-design-vue";
import { Form } from "ant-design-vue";

type Key = string | number;
type FormKey = "name" | "password" | "phone" | "username";
interface Rules {
  required: boolean;
  trigger: "blur" | "focus" | "change";
  message: string;
}
interface Table {
  columns: ColumnsType<System.UserListData>;
  data: System.UserListData[];
  rowSelection: {
    onChange: (selectedRowKeys: Key[]) => void;
    selectedRowKeys: Key[];
  };
  pagination: {
    current: number;
    pageSize: number;
    total: number;
    change: (page: number, pageSize: number) => void;
  };
}
interface FormData {
  form: Record<FormKey, string>;
  rules: Record<FormKey, Rules[]>;
  show: boolean;
  title: string;
  temp: System.UserListData | null;
}
interface Role {
  userRoleIds: string[];
  id: string;
  show: boolean;
  username: string;
  allRoles: System.RoleList[];
}

export default function useData() {
  const table = reactive<Table>({
    columns: [
      {
        title: "用户名",
        dataIndex: "username",
        key: "username",
      },
      {
        title: "姓名",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "手机",
        dataIndex: "phone",
        key: "phone",
      },
      {
        title: "状态",
        dataIndex: "status",
        key: "status",
      },
      {
        title: "创建时间",
        dataIndex: "createTime",
        key: "createTime",
      },
      {
        title: "操作",
        dataIndex: "actions",
        key: "actions",
      },
    ],
    data: [],
    rowSelection: {
      onChange,
      selectedRowKeys: [],
    },
    pagination: {
      current: 1,
      pageSize: 10,
      total: 0,
      change,
    },
  });
  const formData = reactive<FormData>({
    form: {
      name: "",
      username: "",
      password: "",
      phone: "",
    },
    rules: {
      name: [
        {
          required: true,
          trigger: "blur",
          message: "请输入用户姓名",
        },
      ],
      username: [
        {
          required: true,
          trigger: "blur",
          message: "请输入用户名称",
        },
      ],
      phone: [
        {
          required: true,
          trigger: "blur",
          message: "请输入手机号码",
        },
      ],
      password: [
        {
          required: true,
          trigger: "blur",
          message: "请输入用户登录密码",
        },
      ],
    },
    show: false,
    title: "",
    temp: null,
  });
  const role = reactive<Role>({
    userRoleIds: [],
    id: "",
    show: false,
    username: "",
    allRoles: [],
  });

  const { validate, resetFields, validateInfos } = Form.useForm(
    formData.form,
    formData.rules
  );
  const getList = () => {
    userList(table.pagination.current, table.pagination.pageSize).then(
      ({ data }) => {
        const { code, data: result, message: msg } = data;
        if (+code === 200) {
          const { records, total } = result as {
            records: System.UserListData[];
            total: number;
          };
          table.data = records;
          table.pagination.total = total;
        } else {
          table.data = [];
          message.error(msg);
          table.pagination = {
            ...table.pagination,
            total: 0,
            current: 1,
            pageSize: 10,
          };
        }
      }
    );
  };
  function onChange(selectedRowKeys: Key[]) {
    table.rowSelection.selectedRowKeys = selectedRowKeys;
  }
  function change(page: number, pageSize: number) {
    table.pagination.current = page;
    table.pagination.pageSize = pageSize;
    getList();
  }
  function onChangeStatus(row: System.UserListData) {
    changeState(row.id, row.status).then(({ data: result }) => {
      message.destroy();
      const { code, message: msg } = result;
      if (+code === 200) {
        message.success(msg);
      } else {
        message.error(msg);
        getList();
      }
    });
  }
  function onHandle(title: string, temp: System.UserListData | null) {
    resetFields();
    formData.title = title;
    if (temp) {
      formData.temp = temp;
      formData.form.name = temp.name;
      formData.form.username = temp.username;
      // 修改用户时不能直接修改用户密码
      formData.form.password = "password";
      formData.form.phone = temp.phone;
    }
    formData.show = true;
  }
  function onSubmit() {
    validate()
      .then(() => {
        if (formData.title.includes("新增用户")) {
          add(formData.form).then((res) => {
            const { message: msg, code } = res.data;
            if (+code === 200) {
              getList();
              message.success(msg);
              formData.show = false;
            } else {
              message.error(msg);
            }
          });
        } else {
          const data = {
            ...formData.form,
            id: formData.temp!.id,
          };
          // @ts-ignore
          delete data.password;
          edit(data).then((res) => {
            const { message: msg, code } = res.data;
            if (+code === 200) {
              getList();
              message.success(msg);
              formData.show = false;
            } else {
              message.error(msg);
            }
          });
        }
      })
      .catch(() => {
        message.warning("还有必填项未填写，请检查！");
      });
  }
  function onDelete(id: string) {
    deleteUser(id).then((res) => {
      const { message: msg, code } = res.data;
      if (+code === 200) {
        getList();
        message.success(msg);
        formData.show = false;
      } else {
        message.error(msg);
      }
    });
  }
  async function onOpen(row: System.UserListData) {
    role.id = row.id;
    role.username = row.username;
    const {
      data: { data, message: msg, code },
    } = await toAssign(row.id);
    if (+code === 200) {
      const { userRoleIds, allRoles } = data as {
        userRoleIds: string[];
        allRoles: System.RoleList[];
      };
      role.userRoleIds = userRoleIds;
      role.allRoles = allRoles;
      role.show = true;
    } else {
      message.error(msg);
    }
  }
  function onHandleSubmit() {
    doAssign({ userId: role.id, roleIdList: role.userRoleIds }).then(res => {
      const { code, message: msg } = res.data;
      if (+code === 200) {
        message.success(msg);
        role.show = false;
      } else {
        message.error(msg)
      }
    })
  }

  onMounted(() => {
    getList();
  });

  return {
    table,
    formData,
    validateInfos,
    role,
    onChangeStatus,
    onHandle,
    onSubmit,
    validate,
    onDelete,
    onOpen,
    onHandleSubmit,
  };
}
