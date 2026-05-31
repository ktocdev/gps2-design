import { createRouter, createWebHistory } from 'vue-router'
import TokensView from '../views/TokensView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/tokens' },
    { path: '/tokens', component: TokensView },
  ],
})

export default router
