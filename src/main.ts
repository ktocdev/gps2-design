import { createApp } from 'vue'
import './styles/base.css'
import './styles/tokens.css'
import './styles/tokens-page.css'
import router from './router'
import App from './App.vue'

createApp(App).use(router).mount('#app')
