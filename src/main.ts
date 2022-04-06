import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import store from './store/store'
const app = createApp(App)
app.use(router).use(ElementPlus).use(store).mount('#app')

// 更新时间
app.config.globalProperties.$updataTime = "6 April, 2022"