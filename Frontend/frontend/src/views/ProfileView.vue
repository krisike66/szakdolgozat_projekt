<template>
  <div class="profile-page">
    <div class="layout">
      <!-- Profil kártya -->
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

      <!-- Tudásanyag lista -->
      <div class="card-list-container">
        <h2>Általam létrehozott tudásanyagok</h2>
        <div
          v-for="item in userTudasanyagok"
          :key="item.tudasanyag_id"
          class="card-box"
          @click="goToDetail(item.tudasanyag_id)"
        >
          <div>
            <h3>{{ item.cim }}</h3>
            <p>{{ item.tartalom }}</p>
            <small>{{ formatDate(item.modositva) }}</small>
          </div>
        </div>
      </div>
      <div class="stat-box" v-if="userStats">
        <h2>Statisztikák</h2>
        <ul>
          <li><strong>Létrehozott tudásanyagok:</strong> {{ userStats.letrehozott }}</li>
          <li><strong>Módosított tudásanyagok:</strong> {{ userStats.modositott }}</li>
          <li><strong>Hozzászólások:</strong> {{ userStats.kommentek }}</li>
          <li><strong>Értékelések száma:</strong> {{ userStats.ertekelesek }}</li>
          <li><strong>Értékeléseim átlaga:</strong> {{ userStats.atlagErtekeles }}/5</li>
        </ul>
      </div>
      <ProfileStatsChart v-if="userStats" :stats="userStats" />
    </div>
  </div>
</template>

<script>
import api from '../api';
import ProfileStatsChart from '../components/shared/ProfileStatsChart.vue';

export default {
  name: 'ProfileView',
  components: {
    ProfileStatsChart
  },
  data() {
    return {
      userStats: null,
      user: null,
      error: null,
      userTudasanyagok: []
    };
  },
  created() {
    this.fetchProfile();
    this.fetchOwnTudasanyagok();
    this.fetchUserStats();
  },
  methods: {
    async fetchUserStats() {
      try {
        const token = localStorage.getItem('userToken');
        const res = await api.get('/users/stats', {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.userStats = res.data;
      } catch (err) {
        console.error("Statisztika lekérési hiba:", err);
      }
    },
    fetchProfile() {
      const token = localStorage.getItem('userToken');
      if (!token) {
        this.error = "Nincs érvényes bejelentkezés.";
        return;
      }
      api.get('/users/profile', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(response => { this.user = response.data; })
        .catch(() => {
          this.error = "Nem sikerült betölteni a profil adatait.";
        });
    },
    fetchOwnTudasanyagok() {
      const token = localStorage.getItem('userToken');
      api.get('/tudasanyagok', {
        headers: { Authorization: `Bearer ${token}` }
      }).then(response => {
        this.userTudasanyagok = response.data.filter(item => item.letrehozva_altala === this.user?.user_id);
      }).catch(error => {
        console.error("Tudásanyagok betöltése hiba:", error);
      });
    },
    goToDetail(id) {
      this.$router.push(`/tudasanyagok/${id}`);
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString('hu-HU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    },
    logout() {
      localStorage.removeItem('userToken');
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>

canvas {
  max-width: 500px;
  margin: 20px auto;
}

.profile-page {
  background: #f7f7f7;
  min-height: 100vh;
  padding: 30px 20px;
}

.layout {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 40px;
  flex-wrap: wrap;
}

.profile-card {
  background: #ffffff;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.05);
  max-width: 400px;
  width: 100%;
  text-align: center;
  border-left: 6px solid #007bff;
}

.profile-card h1 {
  color: #333333;
  margin-bottom: 20px;
  font-size: 2em;
  border-bottom: 2px solid #007bff;
  padding-bottom: 10px;
}

.profile-info p {
  font-size: 1.1em;
  margin: 10px 0;
  color: #555555;
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

.card-list-container {
  background-color: #ffffff;
  border-radius: 12px;
  padding: 20px;
  width: 100%;
  max-width: 700px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
  overflow-y: auto;
  max-height: 650px;
}

.card-list-container h2 {
  margin-bottom: 16px;
  font-size: 1.5em;
  color: #333;
  border-bottom: 1px solid #ddd;
  padding-bottom: 6px;
}

.card-box {
  background-color: #fff;
  border-left: 6px solid #007bff;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  transition: all 0.2s ease-in-out;
}

.card-box:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.08);
}

.card-box h3 {
  font-size: 1.1em;
  margin-bottom: 4px;
  color: #222;
}

.card-box p {
  color: #555;
  font-size: 0.95em;
}

.card-box small {
  color: #999;
  font-size: 0.85em;
}


.stat-box {
  text-align: left;
  margin-top: 30px;
  background: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  border-left: 4px solid #007bff;
}

.stat-box h2 {
  color: #333;
  margin-bottom: 15px;
}

.stat-box ul {
  list-style: none;
  padding-left: 0;
}

.stat-box li {
  margin-bottom: 8px;
  font-size: 1em;
  color: #555;
}
</style>
