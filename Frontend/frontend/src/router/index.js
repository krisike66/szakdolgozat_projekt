import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import ProfileView from '../views/ProfileView.vue';
import FooldalOldal from '../views/FooldalOldal.vue';
import TudasanyagList from '../views/TudasanyagList.vue';
import TudasanyagDetail from '../views/TudasanyagDetail.vue';




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
  {
    path: '/tudasanyagok',
    name: 'TudasanyagList',
    component: TudasanyagList
  },
  {
    path: '/tudasanyagok/:id',
    name: 'TudasanyagDetail',
    component: TudasanyagDetail
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});




export default router;
