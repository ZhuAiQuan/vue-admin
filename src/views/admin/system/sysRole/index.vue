<script lang="ts" setup>
import useData from "./index";

const {
  getList,
  table,
  pagination,
  onChange,
  modal,
  handleModal,
  form,
  validateInfos,
  validate,
  onSubmit,
  onDel,
} = useData();

getList();
</script>

<template>
  <div class="header">
    <a-button type="primary" @click="handleModal('add', null)">新增</a-button>
  </div>
  <a-table
    :columns="table.columns"
    :data-source="table.data"
    :pagination="{ ...pagination, change: onChange }"
  >
    <template #bodyCell="{ column, record, index }">
      <template v-if="column.dataIndex === 'index'">{{ index + 1 }}</template>
      <template v-else-if="column.dataIndex === 'actions'">
        <a-space>
          <a-button type="primary" @click="handleModal('edit', record)"
            >编辑</a-button
          >
          <a-button type="text" danger @click="onDel(record.id)">删除</a-button>
          <a-button type="text" @click="handleModal('role', record)">分配权限</a-button>
        </a-space>
      </template>
    </template>
  </a-table>
  <Modal v-model:show="modal.show" :title="modal.title">
    <template #footer="{ close }">
      <div style="text-align: center">
        <a-space>
          <a-button type="primary" @click="onSubmit">提交</a-button>
          <a-button type="text" @click="close">取消</a-button>
        </a-space>
      </div>
    </template>
    <template #body>
      <div v-show="modal.title.includes('分配权限')" class="role-ctx">
        <Role :list="modal.role" v-model:selectList="modal.roleIdList" :needUpdate="modal.show" />
      </div>
      <a-form :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }" v-show="!modal.title.includes('分配权限')">
        <a-form-item label="角色名称" v-bind="validateInfos.roleName">
          <a-input
            v-model:value="form.form.roleName"
            @blur="validate('roleName', { trigger: 'blur' }).catch(() => {})"
          />
        </a-form-item>
        <a-form-item label="角色标识" v-bind="validateInfos.roleCode">
          <a-input
            v-model:value="form.form.roleCode"
            @blur="validate('roleCode', { trigger: 'blur' }).catch(() => {})"
          />
        </a-form-item>
      </a-form>
    </template>
  </Modal>
</template>

<style lang="less" scoped>
.header {
  padding: 16px 0;
}
.role-ctx {
  max-height: 600px;
  overflow-y: auto;
}
</style>
