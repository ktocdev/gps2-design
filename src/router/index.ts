import { createRouter, createWebHistory } from 'vue-router'
import HomeView   from '../views/HomeView.vue'
import TokensView from '../views/TokensView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/',       component: HomeView },
    { path: '/tokens', component: TokensView },
  ],
})

export default router