<script lang="ts" setup>
import useData from "../useData";
const {
  getOperLog,
  onReset,
  onChange,
  onPreview,
  operTable,
  operParams,
  pagination,
  preview,
} = useData();
getOperLog();
</script>

<template>
  <div class="header">
    <a-space>
      <a-input
        v-model:value="operParams.operName"
        placeholder="输入用户名"
        allowClear
      />
      <a-input
        v-model:value="operParams.title"
        placeholder="输入模块名称"
        allowClear
      />
    </a-space>
    <a-space>
      <a-button type="primary" @click="getOperLog">查询</a-button>
      <a-button type="text" @click="onReset('getOperLog')">重置</a-button>
    </a-space>
  </div>
  <a-table
    :columns="operTable.columns"
    :dataSource="operTable.data"
    :pagination="{...pagination, onChange: (page: number, size: number) => onChange(page, size, 'getOperLog')}"
    rowKey="id"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.dataIndex === 'actions'">
        <a-button type="text" @click="onPreview(record)">查看详情</a-button>
      </template>
    </template>
  </a-table>
  <Modal v-model:show="preview.show" title="预览数据">
    <template #footer="{ close }">
      <a-button @click="close" type="text">关闭</a-button>
    </template>
    <template #body>
      <div class="api">{{ preview.data?.operUrl }}</div>
      <div class="method">{{ preview.data?.requestMethod }}</div>
      <div class="params">{{ preview.data?.operParam ? JSON.parse(preview.data.operParam) : '无' }}</div>
      <div class="response">{{ preview.data?.jsonResult ? JSON.parse(preview.data.jsonResult) : '无数据或数据转换错误' }}</div>
    </template>
  </Modal>
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
.ant-modal-body {
  & > div::before {
    font-weight: 600;
    font-size: 16px;
  }
  .api {
    &::before {
      content: "请求api接口：";
      font-weight: 600;
      font-size: 16px;
    }
  }
  .method {
    &::before {
      content: "请求方式：";
    }
  }
  .response {
    &::before {
    content: '返回结果：';
  }
  }
  .params::before {
    content: '携带参数：';
  }
}
</style>
