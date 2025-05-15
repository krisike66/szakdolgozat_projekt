<template>
  <div class="edit-tudasanyag">
    <h2>Tudásanyag szerkesztése</h2>
    <form @submit.prevent="updateTudasanyag">
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
        <input type="number" v-model="form.kategoria_id" required />
      </div>
      <div class="form-group">
        <label>Címkék:</label>
        <select v-model="form.cimkek" multiple>
          <option v-for="cimke in cimkek" :key="cimke.cimke_id" :value="cimke.cimke_id">
            {{ cimke.nev }}
          </option>
        </select>
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
        kategoria_id: null,
        cimkek: []
      },
      cimkek: [],
      successMessage: '',
      errorMessage: ''
    };
  },
  created() {
    this.fetchTudasanyag();
    this.fetchCimkek();
  },
  methods: {
    async fetchTudasanyag() {
      try {
        const response = await api.get(`/tudasanyagok/${this.$route.params.id}`, {
          withCredentials: true
        });
        const t = response.data;
        this.form = {
          cim: t.cim,
          tartalom: t.tartalom,
          kategoria_id: t.kategoria_id,
          cimkek: t.cimkek.map(c => c.cimke_id)
        };
      } catch (error) {
        console.error("Hiba a tudásanyag betöltésekor:", error);
      }
    },
    async fetchCimkek() {
      try {
        const response = await api.get('/cimkek', { withCredentials: true });
        this.cimkek = response.data;
      } catch (error) {
        console.error("Hiba a címkék lekérésekor:", error);
      }
    },
    async updateTudasanyag() {
      try {
        const token = localStorage.getItem('userToken');
        await api.put(`/tudasanyagok/${this.$route.params.id}`, this.form, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        this.successMessage = "Sikeres mentés!";
        this.$router.push(`/tudasanyagok/${this.$route.params.id}`);
      } catch (error) {
        console.error("Hiba a mentés során:", error);
        this.errorMessage = "Hiba történt a mentés során.";
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
