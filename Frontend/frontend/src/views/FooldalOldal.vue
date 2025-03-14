<template>
  <div class="home">
    <!-- Menüsor komponens, ami tartalmazhat navigációs elemeket -->
    <MenusorKomponens />


    <header class="hero">
      <h1>Üdvözöljük a Tudásbázisban!</h1>
      <p>Fedezze fel a szervezet tudásanyagait, és találja meg a szükséges információkat gyorsan!</p>
      <KeresoKomponens />
    </header>

    <main class="content">
      <section class="featured">
        <h2>Ajánlott Tudásanyagok</h2>
        <div class="cards">
          <div class="card">Dokumentáció a főbb folyamatokról</div>
          <div class="card">Leggyakoribb kérdések és válaszok</div>
          <div class="card">Segédanyagok új alkalmazottak számára</div>
        </div>
      </section>
      <section class="recent">
        <h2>Legutóbbi Tudásanyagok</h2>
        <div class="cards">
          <div class="card">Projektek összefoglalása</div>
          <div class="card">Biztonsági irányelvek</div>
          <div class="card">Eszközhasználati útmutatók</div>
        </div>
      </section>
    </main>

    <LablecKomponens />
  </div>
</template>

<script>
import MenusorKomponens from '../components/MenusorKomponens.vue';
import LablecKomponens from '../components/LablecKomponens.vue';
import KeresoKomponens from '../components/KeresoKomponens.vue';

export default {
  components: {
    MenusorKomponens,
    LablecKomponens,
    KeresoKomponens,
  },
  methods: {
    logout() {
      // Töröljük a jwt sütit (vagy bármi más, amin a bejelentkezési állapotot tartjuk)
      document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      // Átirányítás a bejelentkezési oldalra (győződj meg róla, hogy a router megfelelően van beállítva)
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
.hero {
  background-color: #f5f5f5;
  padding: 40px 20px;
  color: #333;
  text-align: center;
}

h1 {
  font-size: 2.2em;
  margin-bottom: 0.2em;
}

h2 {
  margin: 20px;
}

p {
  font-size: 1.1em;
}

.content {
  text-align: center;
  margin-bottom: 15px;
  padding: 20px;
}

.cards {
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
}

.card {
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  width: 200px;
  text-align: center;
  font-weight: bold;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.15);
}

/* Stílus a kijelentkezés gombnak */
.logout-container {
  display: flex;
  justify-content: flex-end;
  padding: 10px 20px;
  background-color: #ffffff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.logout-btn {
  background-color: #dc3545;
  border: none;
  padding: 10px 20px;
  color: #ffffff;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s;
}

.logout-btn:hover {
  background-color: #c82333;
}
</style>
