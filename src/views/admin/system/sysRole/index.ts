import {
  getRoleList,
  deleteRole,
  addRole,
  editRole,
} from "api/admin/system/role";
import { toAssign, doAssign } from 'api/admin/system/menu'
import { reactive, ref } from "vue";
import type { ColumnsType } from "ant-design-vue/es/table/interface";
import { message, Form } from "ant-design-vue";

interface Table {
  columns: ColumnsType<System.RoleList>;
  data: System.RoleList[];
}
interface Modal {
  show: boolean;
  title: "添加角色" | "修改角色" | string;
  sourceData: System.RoleList | null;
  roleIdList: (string | number)[];
  role: System.RoleMenu[]
}
type Keys = "roleName" | "roleCode";
interface Form {
  form: Record<Keys, string>;
  rules: Record<Keys, Rules[]>;
}
interface Rules {
  required: boolean;
  trigger: string;
  message: string;
}
export default () => {
  const pagination = reactive({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const roleName = ref("");
  const table = reactive<Table>({
    data: [],
    columns: [
      {
        title: "序号",
        dataIndex: "index",
      },
      {
        title: "角色名称",
        dataIndex: "roleName",
        align: "center",
      },
      {
        title: "角色编码",
        dataIndex: "roleCode",
        align: "center",
      },
      {
        title: "创建时间",
        dataIndex: "createTime",
        align: "center",
      },
      {
        title: "操作",
        dataIndex: "actions",
        align: "center",
      },
    ],
  });
  const modal = reactive<Modal>({
    show: false,
    title: "修改角色",
    sourceData: null,
    roleIdList: [],
    role: []
  });
  const form = reactive<Form>({
    form: {
      roleCode: "",
      roleName: "",
    },
    rules: {
      roleCode: [
        {
          required: true,
          message: "请输入角色标识",
          trigger: "blur",
        },
      ],
      roleName: [
        {
          required: true,
          message: "请输入角色名称",
          trigger: "",
        },
      ],
    },
  });
  const { resetFields, validate, validateInfos } = Form.useForm(
    form.form,
    form.rules
  );

  function getList() {
    getRoleList(roleName.value, pagination.current, pagination.pageSize).then(
      ({ data: result }) => {
        const { data, code } = result;
        if (+code === 200) {
          const { total, records } = data as {
            total: number;
            records: System.RoleList[];
          };
          pagination.total = total;
          table.data = records;
        }
      }
    );
  }
  function onChange(current: number, pageSize: number) {
    pagination.current = current;
    pagination.pageSize = pageSize;
    getList();
  }
  async function handleModal(
    type: "add" | "edit" | "role",
    temp: System.RoleList | null
  ) {
    resetFields();
    if (type === "add") modal.title = "添加角色";
    else if (type === "edit") {
      modal.title = "修改角色";
      form.form.roleCode = temp?.roleCode as string;
      form.form.roleName = temp!.roleName;
    } else if (type === "role") {
      modal.roleIdList = [];
      const {
        data: { code, data, message: msg },
      } = await toAssign(temp!.id);
      if (+code === 200) {
        modal.role = data as System.RoleMenu[];
        getSelectedVal(modal.role);
      } else {
        message.error(msg);
        return;
      }
      modal.title = `分配权限: ${temp?.roleName}`;
    }
    modal.sourceData = temp;
    modal.show = true;
  }
  function onSubmit() {
    if (modal.title === "添加角色") {
      validate()
        .then(() => {
          addRole(form.form).then(({ data }) => {
            const { code, message: msg } = data;
            if (+code === 200) {
              message.success(msg);
              modal.show = false;
              getList();
            } else {
              message.error(msg);
            }
          });
        })
        .catch(() => {
          message.warning("还有必填项未填写!");
        });
    } else if (modal.title === "修改角色") {
      validate()
        .then(() => {
          editRole(
            Object.assign(modal.sourceData as System.RoleList, form.form)
          ).then(({ data }) => {
            const { code, message: msg } = data;
            if (+code === 200) {
              message.success(msg);
              modal.show = false;
              getList();
            } else {
              message.error(msg);
            }
          });
        })
        .catch(() => {
          message.warning("还有必填项未填写!");
        });
    } else {
      if (!modal.roleIdList.length) {
        message.warning('请选择菜单权限!');
        return
      }
      doAssign({ menuIdList: modal.roleIdList, roleId: modal.sourceData!.id }).then(({ data }) => {
        const { code, message: msg } = data;
        if (+code === 200) {
          message.success(msg);
          modal.show = false;
        } else {
          message.error(msg);
        }
      });
    }
  }
  function onDel(id: string) {
    deleteRole(id).then(({ data }) => {
      const { code, message: msg } = data;
      if (+code === 200) {
        message.success(msg);
        modal.show = false;
        getList();
      } else {
        message.error(msg);
      }
    });
  }
  function getSelectedVal(list: System.RoleMenu[]) {
    list.forEach(item => {
      if (item.select && !modal.roleIdList.includes(item.id)) modal.roleIdList.push(item.id)
      if (item.children?.length) getSelectedVal(item.children)
    })
  }

  return {
    pagination,
    roleName,
    getList,
    onChange,
    table,
    modal,
    handleModal,
    form,
    validateInfos,
    validate,
    onSubmit,
    onDel,
  };
};
