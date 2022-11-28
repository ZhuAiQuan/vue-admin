<script lang="ts" setup>
import useData from "../useData";

const {
  getLoginLog,
  loginTable,
  onChange,
  pagination,
  loginParams,
  commonParams,
  onReset
} = useData();
getLoginLog();
</script>

<template>
  <div class="header">
    <a-input v-model:value="loginParams.username" placeholder="输入用户名" allowClear />
    <a-space>
      <a-button type="primary" @click="getLoginLog">查询</a-button>
      <a-button type="text" @click="onReset('getLoginLog')">重置</a-button>
    </a-space>
  </div>
  <a-table
    :columns="loginTable.columns"
    :dataSource="loginTable.data"
    :pagination="{...pagination, onChange: (page: number, size: number) => onChange(page, size, 'getLoginLog')}"
    rowKey="id"
  />
</template>

<style lang="less" scoped>
.header {
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  :deep(.ant-input-affix-wrapper) {
    max-width: 200px;
  }
}
</style>
