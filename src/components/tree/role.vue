<script setup lang="ts">
import { PropType, ref, watch } from 'vue';

const props = defineProps({
  list: {
    type: Array as PropType<System.RoleMenu[]>,
    default: () => []
  },
  selectList: {
    type: Array as PropType<(string | number)[]>,
    default: () => []
  },
  needUpdate: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits()
const checkedKeys = ref<(string | number)[]>([]);
const expandedKeys = ref<(string | number)[]>([]);

function onClearTreeState() {
  expandedKeys.value = [];
  checkedKeys.value = [];
}
function onCheck(checkedKeys: (string | number)[]) {
  // @ts-ignore
  emit('update:selectList', checkedKeys)
}

watch(() => props.needUpdate, (type) => {
  if (type) {
    checkedKeys.value = props.selectList;
    console.log(props.selectList)
  }
}, {
  immediate: true
})

defineExpose({
  onClearTreeState
})
</script>

<template>
  <a-tree
    v-model:expandedKeys="expandedKeys"
    v-model:checkedKeys="checkedKeys"
    checkable
    :tree-data="list"
    :field-names="{ title: 'name', key: 'id' }"
    @check="onCheck"
  />
</template>