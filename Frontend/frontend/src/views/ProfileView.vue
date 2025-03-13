<template>
    <div class="profile-page">
      <h1>Profilom</h1>
      <div v-if="user">
        <p><strong>Felhasználónév:</strong> {{ user.felhasznalonev || user.username }}</p>
        <p><strong>Email:</strong> {{ user.email }}</p>
        <p><strong>Szerepkör:</strong> {{ user.role }}</p>
      </div>
      <div v-else>
        <p>Nincs elérhető felhasználói adat.</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "ProfileView",
    data() {
      return {
        user: null,
      };
    },
    mounted() {
      // Olvasd ki a felhasználói adatokat a localStorage-ból, ha el vannak mentve
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        this.user = JSON.parse(storedUser);
      }
    },
  };
  </script>
  
  <style scoped>
  .profile-page {
    max-width: 600px;
    margin: 20px auto;
    padding: 20px;
  }
  </style>
  