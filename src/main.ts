import { createApp } from 'vue';

import ElementPlus from 'element-plus';
import zhCn from 'element-plus/es/locale/lang/zh-cn';

// import './style.css';
import App from './App.vue';
import router from './router';

const app = createApp(App);
app.use(ElementPlus, { zhCn }).use(router).mount('#app');
