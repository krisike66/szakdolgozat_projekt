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
  max-width: 900px;
  margin: 40px auto;
  padding: 30px;
  background-color: #ffffff;
  border-left: 6px solid #007bff;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  font-family: "Segoe UI", sans-serif;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.header {
  margin-bottom: 20px;
}

.header h1 {
  color: #222;
  margin-bottom: 10px;
  font-size: 2em;
  word-break: break-word;
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

.content p {
  font-size: 1.1em;
  line-height: 1.6em;
  color: #444;
  margin-top: 20px;
  white-space: pre-line;
  word-break: break-word;
}

.cimkek {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.cimke {
  background-color: #007bff;
  color: #fff;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 0.9em;
}

.back-btn {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9em;
  transition: background-color 0.3s ease;
  margin-bottom: 20px;
}

.back-btn:hover {
  background-color: #0056b3;
}
</style>
