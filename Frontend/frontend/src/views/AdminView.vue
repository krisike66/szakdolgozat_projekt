<template>
    <div class="admin-page">
      <h1>Admin Felület</h1>
      <p>Üdv, itt lehet felhasználókat hozzáadni, stb.</p>
      <!-- Itt lesz majd a felhasználó hozzáadása funkció -->
    </div>
  </template>
  
  <script>
  import api from '../api';
  
  export default {
    name: 'AdminView',
    async beforeRouteEnter(to, from, next) {
      try {
        const response = await api.get('/me');
        if (response.data.role !== 'admin') {
          // Ha nem admin a felhasználó, irányítsd haza
          return next('/');
        }
        next();
      } catch (error) {
        // Nem bejelentkezett, irányítsd login oldalra
        next('/login');
      }
    }
  };
  </script>
  
  <style scoped>
  .admin-page {
    text-align: center;
    padding: 20px;
  }
  </style>
  