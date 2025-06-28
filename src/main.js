import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import size from './directives/index'

import App from './App.vue'
import router from './router'

// 应用入口文件（如Vue/React项目）
// import { worker } from './mock/browser';

// 仅在开发环境启用MSW
// if (import.meta.env.DEV) {
//     worker.start().then(() => {
//         console.log('✅ MSW 拦截器已启动');
//     });
// }

const app = createApp(App)

app.directive('size-ob', size);

app.use(createPinia())
app.use(ElementPlus)
app.use(router)

app.mount('#app')
