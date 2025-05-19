<template>
  <div class="create-tudasanyag">
    <h2>Tudásanyag létrehozása</h2>
    <form @submit.prevent="createTudasanyag">
      <div class="form-group">
        <label for="title">Cím</label>
        <input type="text" id="title" v-model="title" required placeholder="Pl.: Etikai kódex" />
      </div>

      <div class="form-group">
        <label for="content">Tartalom</label>
        <textarea id="content" v-model="content" rows="5" required placeholder="Írd be a tudásanyagot..."></textarea>
      </div>

      <div class="form-group">
        <label for="file">Fájl csatolása</label>
        <input type="file" id="file" @change="handleFileUpload" />
      </div>

      <div class="form-group">
        <label for="category">Kategória</label>
        <select v-model="selectedCategoryName" required>
          <option disabled value="">Válassz kategóriát</option>
          <option v-for="kat in kategoriak" :key="kat.kategoria_id" :value="kat.nev">
            {{ kat.nev }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="tags">Címkék</label>
        <select id="tags" v-model="selectedCimkek" multiple>
          <option v-for="cimke in cimkek" :key="cimke.cimke_id" :value="cimke.cimke_id">
            {{ cimke.nev }}
          </option>
        </select>
      </div>

      <button type="submit" class="submit-btn">Létrehozás</button>

      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      <p v-if="successMessage" class="success">{{ successMessage }}</p>
    </form>
  </div>
</template>

<script>
import api from '../api';

export default {
  data() {
    return {
      title: '',
      content: '',
      selectedCategoryName: '',
      kategoriak: [],
      cimkek: [],
      selectedCimkek: [],
      errorMessage: '',
      successMessage: '',
      file: null
    };
  },
  async created() {
    await this.fetchKategoriak();
    await this.fetchCimkek();
  },
  methods: {
    async fetchKategoriak() {
      try {
        const res = await api.get('/kategoriak');
        this.kategoriak = res.data;
      } catch (error) {
        console.error('Kategóriák lekérése sikertelen:', error);
        this.errorMessage = 'Nem sikerült betölteni a kategóriákat.';
      }
    },
    async fetchCimkek() {
      try {
        const res = await api.get('/cimkek');
        this.cimkek = res.data;
      } catch (error) {
        console.error('Címkék lekérése sikertelen:', error);
        this.errorMessage = 'Nem sikerült betölteni a címkéket.';
      }
    },
    handleFileUpload(event) {
      this.file = event.target.files[0];
    },
    async createTudasanyag() {
      try {
        const token = localStorage.getItem('userToken');

        const selectedKategoria = this.kategoriak.find(k => k.nev === this.selectedCategoryName);
        if (!selectedKategoria) {
          this.errorMessage = 'Érvénytelen kategória.';
          return;
        }

        const formData = new FormData();
        formData.append('cim', this.title);
        formData.append('tartalom', this.content);
        formData.append('kategoria_id', selectedKategoria.kategoria_id);

        if (this.file) {
          formData.append('file', this.file); // ⬅️ fájl hozzáadása
        }

        this.selectedCimkek.forEach(cimkeId => {
          formData.append('cimkek[]', cimkeId); // Több címke
        });

        const headers = {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        };

        await api.post('/tudasanyagok', formData, { headers });

        this.successMessage = 'A tudásanyag sikeresen létrehozva!';
        this.errorMessage = '';
        this.title = '';
        this.content = '';
        this.selectedCategoryName = '';
        this.selectedCimkek = [];
        this.file = null;

        this.$router.push('/tudasanyagok');
      } catch (error) {
        console.error('Tudásanyag létrehozási hiba:', error);
        this.errorMessage = 'Hiba történt a tudásanyag létrehozása során.';
        this.successMessage = '';
      }
    }
  }
};
</script>

<style scoped>
.create-tudasanyag {
  max-width: 600px;
  margin: 40px auto;
  background-color: #ffffff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.07);
}

.create-tudasanyag h2 {
  text-align: center;
  color: #333;
  margin-bottom: 25px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  font-weight: bold;
  display: block;
  margin-bottom: 6px;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
  box-sizing: border-box;
}

.form-group select[multiple] {
  height: auto;
  min-height: 100px;
}

.submit-btn {
  display: block;
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.submit-btn:hover {
  background-color: #0056b3;
}

.error {
  margin-top: 10px;
  color: #dc3545;
  text-align: center;
}

.success {
  margin-top: 10px;
  color: #28a745;
  text-align: center;
}
</style>
