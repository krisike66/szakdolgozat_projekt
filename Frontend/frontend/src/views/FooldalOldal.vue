<template>
  <div class="fooldal-wrapper">
    <div class="fooldal-container">
      <h1>Üdvözöljük a Tudásbázisban!</h1>
      <p>Fedezze fel a szervezet tudásanyagait, és találja meg a szükséges információkat gyorsan!</p>

      <div class="search-container">
        <input
          type="text"
          v-model="search"
          placeholder="Keresés a kategóriák között..."
        />
      </div>

      <h2>Mi érdekel ma?</h2>
      <div class="card-container">
        <div
          v-for="kat in filteredKategoriak"
          :key="kat.kategoria_id"
          class="card"
          @click="goToCategory(kat.kategoria_id)"
        >
          <h3>{{ kat.nev }}</h3>
          <p>{{ kat.leiras }}</p>
        </div>
      </div>
      <h2>Legjobbra értékelt tudásanyagok</h2>
      <div class="top-rated-container">
        <div v-for="item in topRated" :key="item.tudasanyag_id" class="card" @click="$router.push(`/tudasanyagok/${item.tudasanyag_id}`)">
          <h3>{{ item.cim }}</h3>
          <p><strong>Szerző:</strong> {{ item.szerzo?.felhasznalonev || 'Ismeretlen' }}</p>
          <p><strong>Átlag:</strong> {{ item.atlag }}/5 <img src="../assets/csillag.png" alt="csillag" class="csillag"/></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../api";

export default {
  data() {
    return {
      search: "",
      kategoriak: [],
      topRated: []
    };
  },
  computed: {
    filteredKategoriak() {
      const term = this.search.toLowerCase();
      return this.kategoriak.filter(k =>
        k.nev.toLowerCase().includes(term) || (k.leiras?.toLowerCase().includes(term))
      );
    }
  },
  created() {
    this.fetchKategoriak();
    this.fetchTopRated();
  },
  methods: {
    async fetchTopRated() {
        try {
          const res = await api.get("/ertekeles/top5");
          this.topRated = res.data;
        } catch (err) {
          console.error("Top értékelt tudásanyagok lekérési hiba:", err);
        }
      },

    async fetchKategoriak() {
      try {
        const res = await api.get("/kategoriak");
        this.kategoriak = res.data;
      } catch (err) {
        console.error("Hiba a kategóriák lekérésekor:", err);
      }
    },
    goToCategory(id) {
      this.$router.push({ path: "/tudasanyagok", query: { kategoria: id } });
    }
  }
};
</script>

<style scoped>
.fooldal-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f4f6f9;
  font-family: "Segoe UI", sans-serif;
}

.fooldal-container {
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  text-align: center;
}

h1 {
  font-size: 2.8em;
  color: #003366;
  margin-bottom: 10px;
}

h2 {
  display: inline-block;
  font-size: 1.8em;
  color: #003366;
  margin-bottom: 20px;
  margin-top: 10px;
  padding-bottom: 5px;
  border-bottom:2px solid #002855;
}


p {
  font-size: 1.1em;
  color: #444;
  margin-bottom: 40px;
}

.search-container {
  margin-bottom: 30px;
}

input[type="text"] {
  width: 70%;
  padding: 14px;
  font-size: 1em;
  border-radius: 6px;
  border: 1px solid #003366;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.card {
  background-color: #fff;
  border-left: 5px solid #005ea8;
  border-radius: 8px;
  box-shadow: 0 3px 10px rgba(0,0,0,0.1);
  padding: 20px;
  width: 280px;
  text-align: left;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 18px rgba(0,0,0,0.15);
}

.card h3 {
  color: #002855;
  margin-bottom: 8px;
  font-size: 1.2em;
}

.card p {
  color: #555;
  font-size: 0.95em;
}

.footer {
  background-color: #222;
  color: #ccc;
  padding: 20px;
  text-align: center;
  margin-top: auto;
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.footer-content a {
  color: #ddd;
  margin: 0 10px;
  text-decoration: none;
  font-size: 0.9em;
}

.footer-content a:hover {
  text-decoration: underline;
}

.top-rated-container {
  margin: 40px auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.csillag {
  width: 15px;
  height: 15px;
}
</style>
