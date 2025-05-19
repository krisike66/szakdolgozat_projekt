<template>
  <div class="edit-tudasanyag">
    <h2>Tudásanyag szerkesztése</h2>
    <form @submit.prevent="updateTudasanyag" enctype="multipart/form-data">
      <div class="form-group">
        <label>Cím:</label>
        <input type="text" v-model="form.cim" required />
      </div>

      <div class="form-group">
        <label>Tartalom:</label>
        <textarea v-model="form.tartalom" rows="6" required></textarea>
      </div>

      <div class="form-group">
        <label>Kategória:</label>
        <select v-model="selectedCategoryName" required>
          <option disabled value="">Válassz kategóriát</option>
          <option v-for="kat in kategoriak" :key="kat.kategoria_id" :value="kat.nev">
            {{ kat.nev }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label>Címkék:</label>
        <select v-model="form.cimkek" multiple>
          <option v-for="cimke in cimkek" :key="cimke.cimke_id" :value="cimke.cimke_id">
            {{ cimke.nev }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label>Fájl csatolása:</label>
        <input type="file" @change="handleFileUpload" />
      </div>

      <button type="submit">Mentés</button>
      <p v-if="successMessage" class="success">{{ successMessage }}</p>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script>
import api from '../api';

export default {
  data() {
    return {
      form: {
        cim: '',
        tartalom: '',
        cimkek: []
      },
      kategoriak: [],
      selectedCategoryName: '',
      cimkek: [],
      file: null,
      successMessage: '',
      errorMessage: ''
    };
  },
  created() {
    this.fetchTudasanyag();
    this.fetchKategoriak();
    this.fetchCimkek();
  },
  methods: {
    async fetchTudasanyag() {
      try {
        const response = await api.get(`/tudasanyagok/${this.$route.params.id}`);
        const t = response.data;
        this.form.cim = t.cim;
        this.form.tartalom = t.tartalom;
        this.form.cimkek = t.cimkek.map(c => c.cimke_id);
        this.selectedCategoryName = t.kategoria?.nev || '';
      } catch (error) {
        console.error("Hiba a tudásanyag betöltésekor:", error);
      }
    },
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
    async updateTudasanyag() {
      try {
        const token = localStorage.getItem('userToken');
        const selectedKategoria = this.kategoriak.find(k => k.nev === this.selectedCategoryName);
        if (!selectedKategoria) {
          this.errorMessage = 'Érvénytelen kategória.';
          return;
        }

        const formData = new FormData();
        formData.append('cim', this.form.cim);
        formData.append('tartalom', this.form.tartalom);
        formData.append('kategoria_id', selectedKategoria.kategoria_id);

        this.form.cimkek.forEach(cimkeId => {
          formData.append('cimkek[]', cimkeId);
        });

        if (this.file) {
          formData.append('file', this.file);
        }

        await api.put(`/tudasanyagok/${this.$route.params.id}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });

        this.successMessage = 'Sikeresen mentve!';
        this.errorMessage = '';
        this.$router.push(`/tudasanyagok/${this.$route.params.id}`);
      } catch (error) {
        console.error('Hiba a mentés során:', error);
        this.errorMessage = 'Hiba történt a mentés során.';
        this.successMessage = '';
      }
    }
  }
};
</script>

<style scoped>
.edit-tudasanyag {
  max-width: 600px;
  margin: 30px auto;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}
.form-group {
  margin-bottom: 15px;
}
label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}
input, textarea, select {
  width: 100%;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
}
button {
  padding: 10px 20px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
button:hover {
  background: #0056b3;
}
.success {
  color: green;
  margin-top: 10px;
}
.error {
  color: red;
  margin-top: 10px;
}
</style>
