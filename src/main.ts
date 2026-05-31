import { createApp } from 'vue'
import '../colors_and_type.css'
import './styles/tokens-page.css'
import router from './router'
import App from './App.vue'

createApp(App).use(router).mount('#app')
