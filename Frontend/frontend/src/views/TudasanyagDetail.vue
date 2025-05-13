<template>
  <div class="tudasanyag-detail">
    <div class="header">
      <button @click="$router.push('/tudasanyagok')" class="back-btn">← Vissza a tudásanyagokhoz</button>
      <h1>{{ tudasanyag.cim }}</h1>
      <p class="meta">
        <span><strong>Szerző:</strong> {{ tudasanyag.szerzo?.felhasznalonev || 'Ismeretlen' }}</span> |
        <span><strong>Módosította:</strong> {{ tudasanyag.modosito?.felhasznalonev || 'Nincs adat' }}</span> |
        <span><strong>Módosítva:</strong> {{ formatDate(tudasanyag.modositva) }}</span>
      </p>
    </div>
    <div class="content">
      <p>{{ tudasanyag.tartalom }}</p>
    </div>
    <div class="cimkek">
      <span v-for="cimke in tudasanyag.cimkek" :key="cimke.cimke_id" class="cimke">
        {{ cimke.nev }}
      </span>
    </div>

  </div>
</template>

<script>
import api from '../api';

export default {
  data() {
    return {
      tudasanyag: {}
    };
  },
  created() {
    this.fetchTudasanyag();
  },
  methods: {
    async fetchTudasanyag() {
      try {
        const response = await api.get(`/tudasanyagok/${this.$route.params.id}`, {
          withCredentials: true,
          params: {
            includeCimkek: true  // <-- Címkék betöltése
          }
        });
        this.tudasanyag = response.data || {};
        console.log("Tudasanyag adatok:", this.tudasanyag);
      } catch (error) {
        console.error('Hiba a tudásanyag részleteinek lekérésekor:', error);
      }
    },
    formatDate(dateString) {
      if (!dateString) return 'Nincs adat';
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
.tudasanyag-detail {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.header {
  margin-bottom: 20px;
}

.header h1 {
  color: #343a40;
}

.header .meta {
  color: #6c757d;
  margin-top: 10px;
  font-size: 0.9em;
}

.content {
  font-size: 1.2em;
  line-height: 1.6em;
  color: #343a40;
}

.back-btn {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 20px;
  transition: background-color 0.3s;
}

.back-btn:hover {
  background-color: #0056b3;
}
</style>
