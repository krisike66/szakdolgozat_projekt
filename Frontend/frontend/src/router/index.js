import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import ProfileView from '../views/ProfileView.vue';
import FooldalOldal from '../views/FooldalOldal.vue';

const routes = [
  {
    path: '/',
    redirect: '/login',  // pl. átirányítás a /home útvonalra
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView,
  },
  {
    path: '/home',
    name: 'home',
    component: FooldalOldal,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
