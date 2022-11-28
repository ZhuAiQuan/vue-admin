<script lang="ts" setup>
import useData from "./useData";
const {
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
} = useData();
</script>

<template>
  <a-space direction="vertical" style="width: 100%">
    <a-button type="primary" @click="onHandle('新增用户', null)">新增</a-button>
    <a-table
      :data-source="table.data"
      :columns="table.columns"
      :row-selection="table.rowSelection"
      rowKey="id"
      :pagination="table.pagination"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'actions'">
          <a-space>
            <a-button
              type="primary"
              @click="onHandle(`编辑用户 ${record.username}`, record)"
              >编辑</a-button
            >
            <a-popconfirm
              :title="`确定删除用户' ${record.username} '吗?`"
              ok-text="删除"
              cancel-text="取消"
              okType="danger"
              @confirm="onDelete(record.id)"
            >
              <a-button type="text" danger>删除</a-button>
            </a-popconfirm>
            <a-button type="text" @click="onOpen(record)">分配角色</a-button>
          </a-space>
        </template>
        <template v-else-if="column.key === 'status'">
          <a-switch
            v-model:checked="record.status"
            checked-children="启用"
            un-checked-children="禁用"
            :checkedValue="1"
            :unCheckedValue="0"
            @click="onChangeStatus(record)"
          />
        </template>
      </template>
    </a-table>
  </a-space>
  <Modal v-model:show="formData.show" :title="formData.title">
    <template #footer="{ close }">
      <div style="text-align: center">
        <a-space>
          <a-button type="primary" @click="onSubmit">提交</a-button>
          <a-button type="text" @click="close">取消</a-button>
        </a-space>
      </div>
    </template>
    <template #body>
      <a-form :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
        <a-form-item label="用户名称" v-bind="validateInfos.username">
          <a-input
            v-model:value="formData.form.username"
            @blur="validate('username', { trigger: 'blur' }).catch(() => {})"
          />
        </a-form-item>
        <a-form-item label="用户姓名" v-bind="validateInfos.name">
          <a-input
            v-model:value="formData.form.name"
            @blur="validate('name', { trigger: 'blur' }).catch(() => {})"
          />
        </a-form-item>
        <a-form-item label="手机号码" v-bind="validateInfos.phone">
          <a-input
            v-model:value="formData.form.phone"
            @blur="validate('phone', { trigger: 'blur' }).catch(() => {})"
          />
        </a-form-item>
        <a-form-item
          label="登录密码"
          v-bind="validateInfos.password"
          v-if="formData.title.includes('新增用户')"
        >
          <a-input
            v-model:value="formData.form.password"
            @blur="validate('password', { trigger: 'blur' }).catch(() => {})"
          />
        </a-form-item>
      </a-form>
    </template>
  </Modal>
  <Modal v-model:show="role.show" title="分配用户权限">
    <template #footer="{ close }">
      <div style="text-align: center">
        <a-space>
          <a-button type="primary" @click="onHandleSubmit">提交</a-button>
          <a-button type="text" @click="close">取消</a-button>
        </a-space>
      </div>
    </template>
    <template #body>
      <div>
        当前用户：<strong>{{ role.username }}</strong>
      </div>
      <div>
        角色分配：
        <a-checkbox-group v-model:value="role.userRoleIds" style="width: 100%">
          <a-row>
            <a-col :span="6" v-for="item in role.allRoles" :key="item.id">
              <a-checkbox :value="item.id">{{ item.roleName }}</a-checkbox>
            </a-col>
          </a-row>
        </a-checkbox-group>
      </div>
    </template>
  </Modal>
</template>

<style lang="less" scoped></style>
