<script lang="ts" setup>
import useData from "./useData";
import { computed } from "vue";
const {
  table,
  onEdit,
  model,
  form,
  validate,
  validateInfos,
  onSubmit,
  onAdd,
  onDel,
} = useData();
const radioGroup = computed(() => {
  const temp = [
    {
      title: "父级组件",
      value: 0,
      disabled: false,
    },
    {
      title: "菜单",
      value: 1,
      disabled: false,
    },
    {
      title: "按钮",
      value: 2,
      disabled: false,
    },
  ];
  if (model.sourceData.parentId) {
    temp[0].disabled = true
  } else {
    temp[1].disabled = true;
    temp[2].disabled = true
  }
  return temp
});
</script>

<template>
  <div class="actions">
    <a-space>
      <a-button
        type="warning"
        :disabled="!table.rowSelection.selectedRowKeys.length"
        >批量删除</a-button
      >
      <a-button type="primary" @click="onAdd(null)">新增</a-button>
    </a-space>
  </div>
  <a-table
    :data-source="table.data"
    :columns="table.columns"
    rowKey="id"
    :row-selection="table.rowSelection"
    :pagination="false"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'actions'">
        <a-space>
          <a-button type="text" @click="onAdd(record)">新增</a-button>
          <a-button type="text" @click="onEdit(record)">编辑</a-button>
          <a-button type="text" danger @click="onDel(record.id)">删除</a-button>
        </a-space>
      </template>
    </template>
  </a-table>
  <Modal v-model:show="model.show" :title="model.title">
    <template #footer="{ close }">
      <div class="footer">
        <a-space>
          <a-button type="primary" @click="onSubmit">提交</a-button>
          <a-button type="text" @click="close">取消</a-button>
        </a-space>
      </div>
    </template>
    <template #body>
      <a-form :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
        <a-form-item label="菜单名称" v-bind="validateInfos.name">
          <a-input
            v-model:value="form.name"
            @blur="validate('name', { trigger: 'blur' }).catch(() => {})"
          />
        </a-form-item>
        <a-form-item label="路径" v-bind="validateInfos.path">
          <a-input
            v-model:value="form.path"
            @blur="validate('path', { trigger: 'blur' }).catch(() => {})"
          />
        </a-form-item>
        <a-form-item label="所属组件">
          <a-input v-model:value="form.component" />
        </a-form-item>
        <a-form-item label="状态">
          <a-switch
            v-model:checked="form.status"
            checked-children="启用"
            un-checked-children="禁用"
            :checkedValue="1"
            :unCheckedValue="0"
          />
        </a-form-item>
        <a-form-item label="类型">
          <a-radio-group v-model:value="form.type">
            <a-radio
              v-for="item in radioGroup"
              :key="item.value"
              :value="item.value"
              :disabled="item.disabled"
              >{{ item.title }}</a-radio
            >
          </a-radio-group>
        </a-form-item>
      </a-form>
    </template>
  </Modal>
</template>

<style lang="less" scoped>
.actions {
  margin-bottom: 16px;
}
.footer {
  text-align: center;
}
</style>
