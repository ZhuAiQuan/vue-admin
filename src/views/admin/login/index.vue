<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import RaindropFX from 'raindrop-fx';
import background from 'assets/images/background.png';
import LoginForm from './form.vue';
import { useRoute, useRouter } from 'vue-router'

const route = useRoute();
const router = useRouter();
const canvas = ref<HTMLCanvasElement>();
const raindropfx = ref<RaindropFX>();
const redirect = ref('')

function to() {
  router.replace(redirect.value || '/admin')
}
onMounted(() => {
  // 获取重定向链接
  if (route.query?.redirect) redirect.value = route.query.redirect as string
debugger
  canvas.value!.width = document.documentElement.offsetWidth;
  canvas.value!.height = document.documentElement.offsetHeight;

  raindropfx.value = new RaindropFX({
    canvas: canvas.value as HTMLCanvasElement,
    background
  });

  
  window.onresize = () => {
    raindropfx.value!.resize(document.documentElement.offsetWidth, document.documentElement.offsetHeight)
  }
  raindropfx.value.start();
})
onUnmounted(() => {
  raindropfx.value!.stop();
  window.onresize = null
})
</script>

<template>
  <div class="login">
    <canvas ref="canvas"></canvas>
    <div class="content">
      <LoginForm @to="to" />
    </div>
  </div>
</template>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
  .content {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>