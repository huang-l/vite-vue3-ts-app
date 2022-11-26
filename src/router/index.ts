import { createRouter, createWebHistory } from 'vue-router';
const Layout = () => import('../layout/Layout.vue');
const Home = () => import('../pages/home/Home.vue');
const Test = () => import('../pages/test/Test.vue');
const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      { path: '', component: Home },
      { path: 'test', component: Test },
    ],
  },
  // 将匹配所有内容并将其放在 `$route.params.pathMatch` 下
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: { template: '<p>Page not found</p>' },
  },
];

const router = createRouter({
  history: createWebHistory(), //===>mode:"history"
  routes,
});

export default router;
