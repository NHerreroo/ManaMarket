import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login', // Redirige la raíz (/) a /login
  },
  {
    path: '/login',
    name: 'Login', // Usa una cadena para el nombre de la ruta
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/tab1', // Redirige la raíz de /tabs a /tabs/tab1
      },
      {
        path: 'tab1',
        component: () => import('@/views/Tab1Page.vue'),
      },
      {
        path: 'tab1/secundaria',
        component: () => import('@/views/Tab1Secundaria.vue'),
      },
      {
        path: 'tab2',
        component: () => import('@/views/Tab2Page.vue'),
      },
      {
        path: 'tab2/secundaria',
        component: () => import('@/views/Tab2Secundaria.vue'),
      },
      {
        path: 'tab3',
        component: () => import('@/views/Tab3Page.vue'),
      },
      {
        path: 'tab3/secundaria',
        component: () => import('@/views/Tab3Secundaria.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;


















