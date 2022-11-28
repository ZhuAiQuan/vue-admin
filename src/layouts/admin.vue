<script setup lang="ts">
import { useUserStore } from 'store/user';

const store = useUserStore();
const menu = [
  {
    title: '退出登录',
    event: store.onLoginOut
  }
]

</script>

<template>
  <a-layout>
    <a-layout-sider
      breakpoint="lg"
      collapsed-width="0"
    >
      <div class="logo" />
      <a-menu theme="dark" mode="inline">
        <Menu v-for="item in store.getMenu" :key="item.path" :routes="item" />
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header :style="{ background: '#fff' }">
        <div class="featur">
          <a-dropdown>
            <a-avatar :src="store.avatar || 'https://joeschmoe.io/api/v1/random'" @click.prevent />
            <template #overlay>
              <a-menu>
                <a-menu-item v-for="item in menu" :key="item.title" @click="item.event">{{ item.title }}</a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </a-layout-header>
      <a-layout-content :style="{ margin: '24px 16px 0' }">
        <div
          :style="{ padding: '24px', background: '#fff' }"
          class="custom-content"
        >
          <router-view v-slot="{ Component }">
            <transition name="fade">
              <component :is="Component" />
            </transition>
          </router-view>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<style lang="less" scoped>
.logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}

.site-layout-sub-header-background {
  background: #fff;
}

.site-layout-background {
  background: #fff;
}

[data-theme="dark"] .site-layout-sub-header-background {
  background: #141414;
}
.ant-layout {
  height: 100%;
  .custom-content {
    height: calc(100% - 24px);
  }
  .ant-layout-header {
    padding: 0 20px;
    .featur {
      display: flex;
      height: 100%;
      align-items: center;
      justify-content: flex-end;
    }
  }
}
</style>
