<template>
  <div class="tudasanyag-list">
    <div class="header">
      <h1>Tudásanyagok</h1>
      <button @click="$router.push('/tudasanyagok/create')" class="create-btn">Új Tudásanyag</button>
    </div>

    <div class="filters">
      <input type="text" v-model="search" placeholder="Keresés..." />
      <select v-model="selectedCategory">
        <option value="">Összes kategória</option>
        <option v-for="kat in kategoriak" :key="kat.kategoria_id" :value="kat.kategoria_id">
          {{ kat.nev }}
        </option>
      </select>
      <button class="reset-btn" @click="resetFilters">Szűrés törlése</button>
    </div>

    <div class="cimkek-grid">
      <label v-for="cimke in cimkek" :key="cimke.cimke_id" class="cimke-box">
        <input type="checkbox" :value="cimke.cimke_id" v-model="selectedCimkek" />
        {{ cimke.nev }}
      </label>
    </div>

    <div class="talalatok">Találatok száma: {{ tudasanyagok.length }}</div>

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
          <span><strong>Kategória:</strong> {{ item.kategoria?.nev || 'Nincs megadva' }}</span>
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
      tudasanyagok: [],
      kategoriak: [],
      cimkek: [],
      search: '',
      selectedCategory: '',
      selectedCimkek: []
    };
  },
  created() {
    this.fetchKategoriak();
    this.fetchCimkek();
    this.fetchTudasanyagok();
  },
  watch: {
    search() {
      this.fetchTudasanyagok();
    },
    selectedCategory() {
      this.fetchTudasanyagok();
      this.fetchCimkek();
    },
    selectedCimkek() {
      this.fetchTudasanyagok();
    },
    '$route.query.kategoria': {
      handler() {
        this.selectedCategory = this.$route.query.kategoria || '';
        this.fetchTudasanyagok();
      },
      immediate: true
    }
  },
  methods: {
    async fetchKategoriak() {
      try {
        const res = await api.get('/kategoriak');
        this.kategoriak = res.data;
      } catch (e) {
        console.error('Hiba a kategóriák lekérésekor:', e);
      }
    },
    async fetchCimkek() {
      try {
        const response = await api.get('/cimkek', {
          params: {
            kategoria_id: this.selectedCategory || null
          }
        });
        this.cimkek = response.data;
      } catch (error) {
        console.error('Hiba a címkék lekérésekor:', error);
      }
    },
    async fetchTudasanyagok() {
      try {
        const response = await api.get('/tudasanyagok', {
          params: {
            kereses: this.search,
            kategoria_id: this.selectedCategory,
            cimke_ids: this.selectedCimkek
          }
        });
        this.tudasanyagok = response.data;
      } catch (error) {
        console.error('Hiba a tudásanyagok lekérésekor:', error);
      }
    },
    resetFilters() {
      this.search = '';
      this.selectedCategory = '';
      this.selectedCimkek = [];
      this.fetchTudasanyagok();
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
  max-width: 1300px;
  margin: 0 auto;
  font-family: "Segoe UI", sans-serif;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
  align-items: center;
}

.filters input,
.filters select {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  max-width: 250px;
}

.cimkek-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 10px;
  margin-bottom: 20px;
}

.cimke-box {
  background-color: #f8f8f8;
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.95em;
  transition: all 0.2s ease;
}

.cimke-box:hover {
  background-color: #e6f0ff;
  border-color: #007bff;
}

.reset-btn {
  background-color: #ffc107;
  border: none;
  padding: 10px 15px;
  color: #000;
  border-radius: 8px;
  cursor: pointer;
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
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 300px;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  display: flex;
  flex-direction: column;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
}

.card h2 {
  color: #343a40;
  margin-bottom: 10px;
  font-size: 1.5em;
  word-break: break-word;
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
  flex-direction: column;
  gap: 4px;
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

.talalatok {
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 1.1em;
}
</style>