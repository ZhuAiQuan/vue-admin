import { createApp } from 'vue'
import App from './App.vue'
import router from 'router/premission'
import { createPinia } from 'pinia'

// 手动引入antdv部分非组件（函数式调用）的样式
import 'ant-design-vue/lib/notification/style/css';
import 'ant-design-vue/lib/message/style/css'
import 'src/assets/styles/index.less'

createApp(App).use(createPinia()).use(router).mount('#app')
