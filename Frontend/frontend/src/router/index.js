import { createRouter, createWebHistory } from 'vue-router';
import jwtDecode from 'jwt-decode';
import LoginView from '../views/LoginView.vue';
import ProfileView from '../views/ProfileView.vue';
import FooldalOldal from '../views/FooldalOldal.vue';
import TudasanyagList from '../views/TudasanyagList.vue';
import TudasanyagDetail from '../views/TudasanyagDetail.vue';
import TudasanyagCreate from '../views/CreateTudasanyagView.vue';
import AdminPanelView from '../views/AdminPanelView.vue';
import EditUserView from '../views/EditUserView.vue';
import DashboardLayout from '../layouts/DashboardLayout.vue';

const routes = [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/',
      component: DashboardLayout,
      children: [
        {
          path: 'home',
          name: 'home',
          component: FooldalOldal,
          meta: { requiresAuth: true },
        },
        {
          path: 'profile',
          name: 'profile',
          component: ProfileView,
          meta: { requiresAuth: true },
        },
        {
          path: 'tudasanyagok',
          name: 'TudasanyagList',
          component: TudasanyagList,
          meta: { requiresAuth: true },
        },
        {
          path: 'tudasanyagok/:id',
          name: 'TudasanyagDetail',
          component: TudasanyagDetail,
          meta: { requiresAuth: true },
        },
        {
          path: 'tudasanyagok/create',
          name: 'TudasanyagCreate',
          component: TudasanyagCreate,
          meta: { requiresAuth: true },
        },
        {
          path: 'tudasanyagok/:id/edit',
          name: 'EditTudasanyag',
          component: () => import('../views/EditTudasanyag.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: 'audit',
          name: 'audit',
          component: () => import('../views/AuditPanelView.vue'),
          meta: { requiresAuth: true, requiredRole: 'auditer' }
        },
        {
          path: 'admin',
          name: 'admin',
          component: AdminPanelView,
          meta: { requiresAdmin: true },
        },
        {
          path: 'admin/users/edit/:userId',
          name: 'EditUser',
          component: EditUserView,
          props: true,
          meta: { requiresAuth: true, requiredRole: 'admin' },
        },
      ],
    },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('userToken');

  if (to.meta.requiresAdmin) {
    if (!token) {
      return next({ path: '/login' });
    }
    try {
      const decoded = jwtDecode(token);
      if (decoded.role !== 'admin') {
        return next({ path: '/login' });
      }
      return next();
    } catch (error) {
      console.error('Token decode error:', error);
      return next({ path: '/login' });
    }
  }
  
  
  if (to.meta.requiresAuth) {
    if (!token) {
      return next({ path: '/login' });
    }
    try {
      jwtDecode(token);
      return next();
    } catch (error) {
      console.error('Token decode error:', error);
      return next({ path: '/login' });
    }
  }
  return next();
});

export default router;
