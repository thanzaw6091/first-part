import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeView.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/AboutView.vue'),
  },
  {
    path: '/todos',
    name: 'Todos',
    component: () => import('../App.vue'),
  },
  {
    path: '/lazy-demo',
    name: 'Lazy Loading Demo',
    component: () => import('../views/LazyDemoView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
