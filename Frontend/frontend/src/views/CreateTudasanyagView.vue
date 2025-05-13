<template>
  <div class="create-tudasanyag">
    <h2>Új Tudásanyag Létrehozása</h2>
    <form @submit.prevent="createTudasanyag">
      <div class="form-group">
        <label for="title">Cím</label>
        <input type="text" id="title" v-model="title" required />
      </div>
      <div class="form-group">
        <label for="content">Tartalom</label>
        <textarea id="content" v-model="content" rows="5" required></textarea>
      </div>
      <div class="form-group">
        <label for="category">Kategória ID</label>
        <input type="number" id="category" v-model="category" required />
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
      category: 1,
      cimkek: [],
      selectedCimkek: [],
      errorMessage: '',
      successMessage: ''
    };
  },
  async created() {
    await this.fetchCimkek(); // Csak egyszer hívjuk meg!
  },
  methods: {
    async fetchCimkek() {
      try {
        const response = await api.get('/cimkek', { withCredentials: true });
        // Ne töltse be újra a címkéket, ha már megvannak
        if (this.cimkek.length === 0) {
          this.cimkek = response.data;
        }
      } catch (error) {
        console.error('Címkék lekérése hiba:', error);
        this.errorMessage = 'Nem sikerült betölteni a címkéket.';
      }
    },
    async createTudasanyag() {
      try {
        const token = localStorage.getItem('userToken');  // JWT token lekérése

        const payload = {
          cim: this.title,
          tartalom: this.content,
          kategoria_id: this.category,
          cimkek: this.selectedCimkek
        };

        const headers = {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        };

        // Küldjük a POST kérést a tokennel együtt
        await api.post('/tudasanyagok', payload, { headers });

        this.successMessage = 'A tudásanyag sikeresen létrehozva!';
        
        // Űrlap mezők törlése
        this.title = '';
        this.content = '';
        this.category = 1;
        this.selectedCimkek = [];
        
        // Vissza a tudásanyagok listához
        this.$router.push('/tudasanyagok');
      } catch (error) {
        console.error('Tudásanyag létrehozási hiba:', error);
        this.errorMessage = 'Hiba történt a tudásanyag létrehozása során.';
      }
    }
  }
};
</script>


<style scoped>
.create-tudasanyag {
  max-width: 600px;
  margin: 20px auto;
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.create-tudasanyag h2 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.submit-btn {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.submit-btn:hover {
  background-color: #0056b3;
}

.error {
  color: #dc3545;
  margin-top: 10px;
}

.success {
  color: #28a745;
  margin-top: 10px;
}
</style>
