<template>
  <div class="search-bar">
    <input
      type="text"
      v-model="query"
      @input="onSearch"
      placeholder="Keresés a tudásanyagok között..."
    />
  </div>
</template>

<script>
export default {
  name: 'KeresoKomponens',
  data() {
    return {
      query: '',
    };
  },
  methods: {
    onSearch() {
      // Itt lehet kezelni a keresést az API-val való összekapcsoláskor
      console.log(`Keresés a következő kifejezésre: ${this.query}`);
    },
  },
};
</script>

<style scoped>
.search-bar {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

input[type="text"] {
  width: 100%;
  max-width: 500px;
  padding: 10px;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s;
}

input[type="text"]:focus {
  border-color: #0083b0;
  outline: none;
}
</style>
