<script setup lang="ts">
import { watch, ref, computed } from 'vue';

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  }
})

const visible = computed(() => props.show)
</script>

<template>
  <a-modal v-model:visible="visible" :title="title" @cancel="$emit('update:show', false)">
    <template #title>
      <slot name="title" />
    </template>
    <template #footer>
      <slot name="footer" :close="() => $emit('update:show', false)" />
    </template>
    <slot name="body" />
  </a-modal>
</template>

<style lang="less" scoped></style>