<template>
  <div class="fooldal-container">
    <h1>Üdvözöljük a Tudásbázisban!</h1>
    <p>Fedezze fel a szervezet tudásanyagait, és találja meg a szükséges információkat gyorsan!</p>

    <!-- Kereső mező -->
    <div class="search-container">
      <input
        type="text"
        placeholder="Keresés a tudásanyagok között..."
        v-model="searchTerm"
        @input="filterTudasanyagok"
      />
    </div>

    <!-- Ajánlott Tudásanyagok -->
    <div class="tudasanyagok-container">
      <h2>Ajánlott Tudásanyagok</h2>
      <div class="card-container">
        <div
          v-for="item in filteredTudasanyagok"
          :key="item.id"
          class="card"
        >
          <h3>{{ item.title }}</h3>
          <p>{{ item.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchTerm: "",
      tudasanyagok: [
        { id: 1, title: "Dokumentáció a főbb folyamatokról", description: "Minden fontos lépés egy helyen." },
        { id: 2, title: "Leggyakoribb kérdések és válaszok", description: "Gyakran ismételt kérdések gyűjteménye." },
        { id: 3, title: "Segédanyagok új alkalmazottak számára", description: "Útmutatók és segédletek az új belépőknek." },
        { id: 4, title: "Projekt összefoglalása", description: "Főbb projekt információk egy helyen." },
        { id: 5, title: "Biztonsági irányelvek", description: "Fontos információk a biztonságról." },
        { id: 6, title: "Eszközhasználati útmutatók", description: "Hogyan használd az eszközöket hatékonyan." },
      ],
      filteredTudasanyagok: [],
    };
  },
  mounted() {
    this.filteredTudasanyagok = this.tudasanyagok;
  },
  methods: {
    filterTudasanyagok() {
      const term = this.searchTerm.toLowerCase();
      this.filteredTudasanyagok = this.tudasanyagok.filter(item =>
        item.title.toLowerCase().includes(term) ||
        item.description.toLowerCase().includes(term)
      );
    },
  },
};
</script>

<style scoped>
.fooldal-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  text-align: center;
}

h1 {
  font-size: 3em;
  color: #222;
  margin-bottom: 10px;
}

p {
  font-size: 1.2em;
  color: #555;
  margin-bottom: 40px;
}

.search-container {
  margin-bottom: 40px;
}

input[type="text"] {
  width: 80%;
  padding: 15px;
  font-size: 1em;
  border-radius: 8px;
  border: 1px solid #ccc;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.card {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  padding: 20px;
  width: 300px;
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0,0,0,0.2);
}

.card h3 {
  color: #343a40;
  margin-bottom: 10px;
}

.card p {
  color: #777;
}
</style>
