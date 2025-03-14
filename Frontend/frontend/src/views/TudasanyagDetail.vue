<template>
    <div class="tudasanyag-detail">
      <MenusorKomponens />
      <div class="content">
        <h1>{{ tudasanyag?.cim }}</h1>
        <p v-if="tudasanyag">{{ tudasanyag.tartalom }}</p>
        <p v-else>Betöltés...</p>
        <div class="metadata">
          <p><strong>Létrehozva:</strong> {{ formatDate(tudasanyag?.letrehozva) }}</p>
          <p><strong>Módosítva:</strong> {{ formatDate(tudasanyag?.modositas) }}</p>
          <p><strong>Kategória ID:</strong> {{ tudasanyag?.kategoria_id }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import api from '../api';
  import MenusorKomponens from '../components/MenusorKomponens.vue';
  
  export default {
    name: 'TudasanyagDetail',
    components: { MenusorKomponens },
    data() {
      return {
        tudasanyag: null,
        error: null
      };
    },
    created() {
      this.fetchTudasanyag();
    },
    methods: {
      async fetchTudasanyag() {
        try {
          const id = this.$route.params.id; // a path-ból jön
          const response = await api.get(`/tudasanyagok/${id}`);
          this.tudasanyag = response.data;
        } catch (error) {
          console.error('Hiba egy tudásanyag betöltésekor:', error);
          this.error = 'Hiba történt a tudásanyag betöltésekor.';
        }
      },
      formatDate(dateStr) {
        if (!dateStr) return 'N/A';
        const dateObj = new Date(dateStr);
        return dateObj.toLocaleString('hu-HU'); 
      }
    }
  };
  </script>
  
  <style scoped>
  .tudasanyag-detail {
    margin: 0px;
  }
  
  .content {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.1);
  }
  
  .metadata p {
    margin: 5px 0;
  }
  </style>
  