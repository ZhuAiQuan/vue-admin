import { reactive, onMounted } from "vue";
import { menuList, changeMenu, addMenu, delMenu } from "api/admin/system/menu";
import { message, Form } from "ant-design-vue";
import type { ColumnsType } from "ant-design-vue/es/table/interface";

type Key = string | number;
interface Table {
  data: System.MenuListData[];
  columns: ColumnsType<System.MenuListData>;
  rowSelection: {
    onChange: (selectedRowKeys: Key[]) => void;
    selectedRowKeys: Key[];
  };
}
interface Model {
  show: boolean;
  title: string;
  sourceData: System.MenuListData;
}
interface Form {
  component: string;
  icon: string;
  name: string;
  path: string;
  status: 0 | 1;
  type: 0 | 1 | 2;
}

export default function () {
  const table = reactive<Table>({
    data: [],
    columns: [
      {
        title: "菜单名称",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "路径",
        dataIndex: "path",
        key: "path",
      },
      {
        title: "组件",
        dataIndex: "component",
        key: "component",
      },
      {
        title: "操作",
        dataIndex: "actions",
        key: "actions",
      },
    ],
    rowSelection: {
      selectedRowKeys: [],
      onChange,
    },
  });
  const model = reactive<Model>({
    show: false,
    title: "新增菜单栏",
    sourceData: {
      name: "",
      children: [],
      component: "",
      createTime: "",
      icon: "",
      id: "",
      parentId: 0,
      path: "",
      status: 0,
      type: 0,
      updateTime: "",
    },
  });
  const form = reactive<Form>({
    component: "",
    icon: "",
    name: "",
    path: "",
    status: 1,
    type: 0,
  });
  const rules = reactive({
    name: [
      {
        required: true,
        message: "请输入菜单名称",
        trigger: "blur",
      },
    ],
    path: [
      {
        required: true,
        message: "请输入菜单路径",
        trigger: "blur",
      },
    ],
  });
  const { resetFields, validate, validateInfos } = Form.useForm(form, rules);

  const getList = () => {
    menuList().then(({ data: result }) => {
      const { data, code, message: msg } = result;
      if (+code === 200) {
        table.data = data as System.MenuListData[];
      } else {
        message.error(msg);
        table.data = [];
      }
    });
  };
  function onChange(selectedRowKeys: Key[]) {
    table.rowSelection.selectedRowKeys = selectedRowKeys;
  }
  function onEdit(row: System.MenuListData) {
    resetFields();
    model.sourceData = row;
    model.title = `编辑 ${row.name}`;
    // 赋值给form
    for (const key in form) {
      // @ts-ignore
      form[key as keyof Form] = row[key as keyof Form];
    }
    model.show = true;
  }
  function onAdd(row: System.MenuListData | null) {
    resetFields();
    if (row) {
      model.sourceData.parentId = row.id;
      model.title = `${row.name} 新增下级菜单`;
      form.type = 1
    } else {
      model.title = "新增菜单";
    }
    model.show = true;
  }
  function onSubmit() {
    validate()
      .then(() => {
        if (model.sourceData.id) {
          const data = Object.assign(
            { id: model.sourceData.id, parentId: model.sourceData.parentId },
            form
          );
          changeMenu(data).then(({ data: result }) => {
            const { code, message: msg } = result;
            if (+code === 200) {
              message.success(msg);
              model.show = false;
              model.sourceData = {
                name: "",
                children: [],
                component: "",
                createTime: "",
                icon: "",
                id: "",
                parentId: 0,
                path: "",
                status: 0,
                type: 0,
                updateTime: "",
              };
              getList();
            } else {
              message.error(msg);
            }
          });
        } else {
          // 新增
          const data = form;
          if (model.sourceData.parentId || model.sourceData.parentId === 0)
            Object.assign(data, { parentId: model.sourceData.parentId });
          addMenu(data).then(({ data: result }) => {
            const { code, message: msg } = result;
            if (+code === 200) {
              message.success(msg);
              model.show = false;
              model.sourceData = {
                name: "",
                children: [],
                component: "",
                createTime: "",
                icon: "",
                id: "",
                parentId: 0,
                path: "",
                status: 0,
                type: 0,
                updateTime: "",
              };
              getList();
            } else {
              message.error(msg);
            }
          });
        }
      })
      .catch(() => {
        message.warning("还有必填项未完成!");
      });
  }
  function onDel(id: number | string) {
    delMenu(id).then(res => {
      const { message: msg, code } = res.data;
      if (+code === 200) {
        message.success(msg);
        getList()
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
    model,
    form,
    rules,
    validateInfos,
    validate,
    onEdit,
    onSubmit,
    onAdd,
    onDel
  };
}
