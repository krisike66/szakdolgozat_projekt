<template>
  <div class="tudasanyag-list">
    <div class="header">
      <h1>Tudásanyagok</h1>
      <button @click="$router.push('/tudasanyagok/create')" class="create-btn">Új Tudásanyag</button>
    </div>

    <div class="cards">
      <div 
        v-for="item in tudasanyagok" 
        :key="item.tudasanyag_id" 
        class="card"
        @click="goToDetail(item.tudasanyag_id)"
      >
        <h2>{{ item.cim }}</h2>
        <p>{{ shortText(item.tartalom) }}</p>
        
        <div class="cimkek">
          <span v-for="cimke in item.cimkek" :key="cimke.cimke_id" class="cimke">
            {{ cimke.nev }}
          </span>
        </div>


        <div class="card-meta">
          <span><strong>Szerző:</strong> {{ item.szerzo?.felhasznalonev || 'Ismeretlen' }}</span>
          <span><strong>Módosítva:</strong> {{ formatDate(item.modositva) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../api';

export default {
  data() {
    return {
      tudasanyagok: []
    };
  },
  created() {
    this.fetchTudasanyagok();
  },
  methods: {
    async fetchTudasanyagok() {
      try {
        const response = await api.get('/tudasanyagok', {
          withCredentials: true,
          params: {
            includeCimkek: true  // <-- Címkék betöltése
          }
        });
        this.tudasanyagok = response.data;
      } catch (error) {
        console.error('Hiba a tudásanyagok lekérésekor:', error);
      }
    },
    goToDetail(id) {
      this.$router.push(`/tudasanyagok/${id}`);
    },
    shortText(text) {
      if (!text) return '';
      const maxLength = 120;
      return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString('hu-HU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
  }
};
</script>


<style scoped>
.tudasanyag-list {
  padding: 40px 20px;
  background-color: #f4f4f9;
  min-height: 100vh;
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.create-btn {
  background-color: #007bff;
  border: none;
  padding: 10px 15px;
  color: #fff;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

.create-btn:hover {
  background-color: #0056b3;
  transform: scale(1.05);
}

.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.card {
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  padding: 20px;
  width: 300px;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  display: flex;
  flex-direction: column;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0,0,0,0.2);
}

.card h2 {
  color: #343a40;
  margin-bottom: 10px;
  font-size: 1.5em;
}

.card p {
  color: #555;
  margin-bottom: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.card-meta {
  font-size: 0.9em;
  color: #888;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.card-meta span {
  margin-bottom: 5px;
}

.cimkek {
  margin-bottom: 10px;
}

.cimke {
  background-color: #007bff;
  color: #fff;
  padding: 5px 10px;
  border-radius: 4px;
  margin-right: 5px;
  margin-bottom: 5px;
  display: inline-block;
  font-size: 0.8em;
}
</style>
