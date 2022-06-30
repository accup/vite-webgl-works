import { createRouter, createWebHistory } from 'vue-router';
import Index from './pages/Index.vue';
import Work from './pages/Work.vue';

const routes = [
  { path: '/', component: Index },
  { path: '/works/:names+', component: Work },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
