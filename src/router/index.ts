import { createRouter, createWebHistory } from 'vue-router'
import HomeView           from '../views/HomeView.vue'
import TokensView         from '../views/TokensView.vue'
import DesignElementsView from '../views/DesignElementsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/',                component: HomeView },
    { path: '/tokens',          component: TokensView },
    { path: '/design-elements', component: DesignElementsView },
  ],
})

export default router
