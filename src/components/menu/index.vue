<script setup lang="ts">
import { PropType } from 'vue';
import Menu from './index.vue'

defineProps({
  routes: {
    type: Object as PropType<Login.Routers>,
    default: () => ({})
  }
});

</script>

<template>
  <template v-if="routes?.children?.length">
    <a-sub-menu :key="routes.path">
      <template #title>{{ routes.meta.title }}</template>
      <Menu v-for="item in routes.children" :key="item.path" :routes="item" />
    </a-sub-menu>
  </template>
  <template v-else>
    <a-menu-item :key="routes.path">
      <router-link :to="routes.path">{{ routes?.meta.title }}</router-link>
    </a-menu-item>
  </template>
</template>