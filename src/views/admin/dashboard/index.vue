<script setup lang="ts">
import { ref } from 'vue';
import router from 'src/router'

function to() {
  router.push('/admin/system/user')
}
</script>

<template>
  <div>
    <a-space>
      <a-button type="primary" @click="to">跳转</a-button>
    </a-space>
  </div>
</template>

<style lang="less" scoped></style>