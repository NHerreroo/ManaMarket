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
    path: '/forgot',
    name: 'Forgot', // Usa una cadena para el nombre de la ruta
    component: () => import('@/views/forgotpassw.vue'),
  },
  {
    path: '/register', // Nueva ruta para el registro
    name: 'Register',
    component: () => import('@/views/Register.vue'),
  },
  {
    path: '/confirm', // Nueva ruta para Confirmar registro
    name: 'Confirm',
    component: () => import('@/views/Confirm.vue'),
  },
  {
    path: '/tabs/',
    name: 'tabs',
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
        path: 'tab2',
        component: () => import('@/views/Tab2Page.vue'),
      },
      {
        path: 'tab2/card',
        component: () => import('@/views/SearchedCard.vue'),
      },
      {
        path: 'tab3',
        component: () => import('@/views/Tab3Page.vue'),
      },
      {
        path: 'tab3/collection',
        component: () => import('@/views/Collection.vue'),
      },
      {
        path: 'tab3/deck',
        component: () => import('@/views/viewDeck.vue'),
      },
      {
        path: 'tab3/deck/edit',
        component: () => import('@/views/editDeck.vue'),
      },
      {
        path: 'tab3/newdeck',
        component: () => import('@/views/newDeck.vue'),
      },
      {
        path: 'tab4',
        component: () => import('@/views/Tab4Page.vue'),
      },
      {
        path: 'tab4/shoping',
        component: () => import('@/views/ShopingSearched.vue'),
      },
      {
        path: 'tab5',
        component: () => import('@/views/Tab5Page.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;


















