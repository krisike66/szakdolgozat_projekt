<template>
    <div class="tudasanyag-list">
      <MenusorKomponens />
  
      <h1>Tudásanyagok</h1>
  
      <div class="cards">
        <div 
          v-for="item in tudasanyagok" 
          :key="item.tudasanyag_id" 
          class="card"
          @click="goToDetail(item.tudasanyag_id)"
        >
          <h2>{{ item.cim }}</h2>
          <!-- Kivágás, ha hosszú a szöveg -->
          <p>{{ shortText(item.tartalom) }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import api from '../api';
  import MenusorKomponens from '../components/MenusorKomponens.vue';
  
  export default {
    name: 'TudasanyagList',
    components: { MenusorKomponens },
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
          const response = await api.get('/tudasanyagok');
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
        // Pl. 100 karakterig vágjuk, utána ...
        const maxLength = 100;
        return text.length > maxLength
          ? text.substring(0, maxLength) + '...'
          : text;
      }
    }
  };
  </script>
  
  <style scoped>
  .tudasanyag-list {
    margin: 0px;
  }
  
  .cards {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
  }
  
  .card {
    width: 250px;
    background-color: #949494;
    border-radius: 8px;
    box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.1);
    padding: 16px;
    cursor: pointer;
    transition: transform 0.2s ease-in-out;
  }
  .card:hover {
    transform: translateY(-3px);
  }
  </style>
  