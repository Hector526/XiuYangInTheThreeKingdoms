import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const stableRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/Sm2Crypto',
    component: () => import(/* webpackChunkName: "main" */ '@/pages/Main.vue'),
    children: [
      {
        path: '/Sm2Crypto',
        name: 'Sm2Crypto',
        component: () =>
          import(/* webpackChunkName: "main" */ '@/pages/Sm2Crypto.vue'),
      },
      {
        path: '/Sm3Crypto',
        name: 'Sm3Crypto',
        component: () =>
          import(/* webpackChunkName: "main" */ '@/pages/Sm3Crypto.vue'),
      },
      {
        path: '/Sm4Crypto',
        name: 'Sm4Crypto',
        component: () =>
          import(/* webpackChunkName: "main" */ '@/pages/Sm4Crypto.vue'),
      },
      {
        path: '/About',
        name: 'About',
        component: () =>
          import(/* webpackChunkName: "main" */ '@/pages/About.vue'),
      },
    ],
  },
  {
    path: '/:pathMath(.*)*',
    redirect: '/',
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_ROUTER_BASE_URL),
  routes: stableRoutes,
});

export default router;
