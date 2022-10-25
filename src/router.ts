import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/page1',
    name: 'page1',
    // @ts-ignore
    component: () => import('./BugTestListPage.vue'),
  },
  {
    path: '/page2',
    name: 'page2',
    // @ts-ignore
    component: () => import('./BugTest3DItem.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router
