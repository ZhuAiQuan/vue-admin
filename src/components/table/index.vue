<script setup lang="ts">
import { PropType } from 'vue'

defineProps({
  data: {
    type: Array,
    default: () => []
  },
  columns: {
    type: Array,
    default: () => []
  }
})
</script>

<template>
  <a-table :data-source="data"></a-table>
</template>