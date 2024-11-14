<template>
  <div id="app">
      <h1>Vue és Express Tudásbázis</h1>
      <p>{{ message }}</p>
  </div>
</template>

<script>
import api from './api';

export default {
  data() {
      return {
          message: 'Kapcsolódás tesztelése...',
      };
  },
  async created() {
      try {
          const response = await api.get('/test');
          this.message = response.data.message;
      } catch (error) {
          this.message = 'Hiba az API elérésében';
      }
  },
};
</script>
