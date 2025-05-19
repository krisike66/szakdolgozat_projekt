<template>
  <div class="audit-panel">
    <h2>Audit Panel – Jóváhagyásra váró tudásanyagok</h2>

    <div v-if="tudasanyagok.length === 0">
      <p>Nincs jóváhagyásra váró tudásanyag.</p>
    </div>

    <div v-else class="tudasanyagok-container">
      <div v-for="tudas in tudasanyagok" :key="tudas.tudasanyag_id" class="tudas-card">
        <h3>{{ shortText(tudas.cim) }}</h3>
        <p><strong>Kategória:</strong> {{ tudas.kategoria?.nev || 'Nincs kategória' }}</p>
        <p><strong>Szerző:</strong> {{ tudas.szerzo?.felhasznalonev || 'Ismeretlen' }}</p>
        <p class="tartalom-preview"><strong>Tartalom:</strong> {{ shortText(tudas.tartalom) }}</p>

        <div class="gombok">
          <button @click="goToEdit(tudas.tudasanyag_id)" class="edit-btn">Szerkesztés</button>
          <button @click="approve(tudas.tudasanyag_id)" class="approve-btn">Jóváhagyás</button>
        </div>
      </div>
    </div>

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script>
import api from '../api';


export default {
  name: 'AuditPanelView',
  data() {
    return {
      tudasanyagok: [],
      errorMessage: ''
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
            includeAll: 'true'
          }
        });
        this.tudasanyagok = response.data.filter(t => t.audit_approved === false);
      } catch (error) {
        console.error("Tudásanyagok lekérése hiba:", error);
        this.errorMessage = "Hiba történt az adatok lekérésekor.";
      }
    },
    async approve(id) {
      try {
        const token = localStorage.getItem('userToken');
        await api.patch(`/tudasanyagok/${id}/approve`, null, {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.fetchTudasanyagok();
      } catch (error) {
        console.error("Jóváhagyás hiba:", error);
        this.errorMessage = "Hiba történt a jóváhagyás során.";
      }
    },
    goToEdit(id) {
      this.$router.push({ name: 'EditTudasanyag', params: { id } });
    },
    shortText(text) {
      if (!text) return '';
      const maxLength = 60;
      return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    }
  }
};
</script>

<style scoped>
.audit-panel {
  max-width: 1000px;
  margin: 40px auto;
  padding: 20px;
  background-color: #fefefe;
  border-radius: 8px;
}

.tudasanyagok-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
}

.tudas-card {
  background: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
}

.tudas-card h3 {
  margin-bottom: 10px;
  color: #333;
}

.tartalom-preview {
  margin: 10px 0;
  color: #555;
  white-space: pre-line;
}

.gombok {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

button {
  padding: 8px 14px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 600;
}

.approve-btn {
  background-color: #28a745;
  color: white;
}

.approve-btn:hover {
  background-color: #218838;
}

.edit-btn {
  background-color: #007bff;
  color: white;
}

.edit-btn:hover {
  background-color: #0056b3;
}

.error {
  color: red;
  margin-top: 20px;
}
</style>
