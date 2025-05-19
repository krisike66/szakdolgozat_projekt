<template>
  <nav class="menusor">
    <ul class="menu">
      <li><router-link to="/home">Főoldal</router-link></li>
      <li><router-link to="/profile">Profil</router-link></li>
      <li><router-link to="/tudasanyagok">Tudásanyagok</router-link></li>
      <li><router-link to="/audit">Audit Panel</router-link></li>
      <li v-if="isAdmin"><router-link to="/admin">Admin</router-link></li>
    </ul>
    <ErtesitesBell class="ertesites-ikon" />
    <div class="logout-container">
      <button class="logout-btn" @click="logout">Kijelentkezés</button>
    </div>
  </nav>
</template>

<script>
import ErtesitesBell from '@/components/shared/ErtesitesBell.vue';
export default {
  name: 'MenusorKomponens',
  components: {
      ErtesitesBell
  },
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
  background-color: #1d2951; /* Sötétkék */
  padding: 12px 24px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

.menu {
  list-style: none;
  display: flex;
  gap: 20px;
  margin: 0;
  padding: 0;
}

.menu li {
  font-size: 1rem;
}

.menu li a {
  color: #f0f0f0;
  text-decoration: none;
  padding: 6px 12px;
  border-radius: 4px;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.menu li a:hover {
  background-color: #34498e;
  color: #ffffff;
}

.logout-container {
  display: flex;
  align-items: center;
}

.logout-btn {
  background-color: transparent;
  border: 1px solid #fff;
  color: #fff;
  padding: 6px 14px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.logout-btn:hover {
  background-color: #ffffff;
  color: #1d2951;
}

.ertesites-ikon {
  position: absolute;
  top: 25px;
  right: 200px;
}

</style>
