<template>
  <nav class="menusor">
    <ul class="menu">
      <li><router-link to="/home">Főoldal</router-link></li>
      <li><router-link to="/profile">Profil</router-link></li>
      <li><router-link to="/tudasanyagok">Tudásanyagok</router-link></li>
      <li v-if="isAdmin"><router-link to="/admin">Admin</router-link></li>
    </ul>
    <div class="logout-container">
      <button class="logout-btn" @click="logout">Kijelentkezés</button>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'MenusorKomponens',
  data() {
    return {
      isAdmin: false,
    };
  },
  mounted() {
    this.checkAdmin();
  },
  methods: {
    checkAdmin() {
      const token = localStorage.getItem('userToken');
      if (token) {
        try {
          const decoded = JSON.parse(atob(token.split('.')[1]));
          this.isAdmin = decoded.role === 'admin';
        } catch (error) {
          console.error('Token decode error:', error);
        }
      }
    },
    logout() {
      localStorage.removeItem('userToken');
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
.menusor {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #222;
  padding: 10px 20px;
  color: #fff;
}

.menu {
  list-style: none;
  display: flex;
  gap: 20px;
  margin: 0;
  padding: 0;
}

.menu li {
  font-size: 1em;
}

.menu li a {
  color: #fff;
  text-decoration: none;
  transition: color 0.3s;
}

.menu li a:hover {
  color: #f1c40f;
}

.logout-container {
  /* Biztosítja, hogy a kijelentkezés gomb megfelelően igazodik */
}

.logout-btn {
  background: transparent;
  border: 1px solid #f1c40f;
  color: #f1c40f;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.logout-btn:hover {
  background-color: #f1c40f;
  color: #222;
}
</style>
