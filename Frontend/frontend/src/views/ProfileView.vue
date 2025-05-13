<template>
  <div class="profile-page">
    <!-- Profil kártya konténer -->
    <div class="profile-container">
      <div class="profile-card">
        <h1>Profilom</h1>
        <div class="profile-info" v-if="user">
          <p><strong>Felhasználónév:</strong> {{ user.felhasznalonev }}</p>
          <p><strong>Email:</strong> {{ user.email }}</p>
          <p><strong>Szerepkör:</strong> {{ user.role }}</p>
        </div>
        <div v-else-if="error">
          <p class="error">{{ error }}</p>
        </div>
        <div v-else>
          <p>Profil adatok betöltése...</p>
        </div>
        <button class="logout-btn" @click="logout">Kijelentkezés</button>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../api';

export default {
  name: 'ProfileView',
  components: {
  },
  data() {
    return {
      user: null,
      error: null,
    };
  },
  created() {
    this.fetchProfile();
  },
  methods: {
    fetchProfile() {
      const token = localStorage.getItem('userToken');  // Hozzáadjuk a token fejléchez
      if (!token) {
        this.error = "Nincs érvényes bejelentkezés.";
        return;
      }

      api.get('/users/profile', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => {
          this.user = response.data;
        })
        .catch(error => {
          console.error("Profil betöltési hiba:", error);
          this.error = "Nem sikerült betölteni a profil adatait.";
        });
    },
}
};
</script>

<style scoped>
.profile-page {
  background: #f7f7f7;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.profile-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  padding: 20px;
}

.profile-card {
  background: #ffffff;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
  text-align: center;
  border: 1px solid #e0e0e0;
}

.profile-card h1 {
  color: #333333;
  margin-bottom: 20px;
  font-size: 2em;
  border-bottom: 2px solid #f1c40f;
  padding-bottom: 10px;
}

.profile-info p {
  font-size: 1.1em;
  margin: 10px 0;
  color: #555555;
}

.profile-info strong {
  color: #000000;
}

.logout-btn {
  margin-top: 20px;
  background-color: #e74c3c;
  border: none;
  padding: 12px 20px;
  color: #ffffff;
  font-size: 1em;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.logout-btn:hover {
  background-color: #c0392b;
}

.error {
  color: #e74c3c;
  font-weight: bold;
  margin-top: 15px;
}
</style>
