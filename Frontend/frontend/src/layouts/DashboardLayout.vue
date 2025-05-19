<template>
  <div class="dashboard-layout">
    <!-- Fejléc -->
    <header class="fejlec">
      <MenusorKomponens />
    </header>

    <!-- Tartalom -->
    <main class="fo-tartalom">
      <router-view />
    </main>

    <!-- Lábléc -->
    <footer class="lablec">
      <LablecKomponens />
    </footer>
  </div>
</template>

<script>
import MenusorKomponens from "@/components/shared/MenusorKomponens.vue";
import LablecKomponens from "@/components/shared/LablecKomponens.vue";

export default {
  name: "DashboardLayout",
  components: {
    MenusorKomponens,
    LablecKomponens,
  },
};
</script>

<style scoped>
.dashboard-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.fejlec {
  background-color: #1d2951;
  color: white;
  width: 100%;
}

.fo-tartalom {
  flex: 1;
  padding: 30px;
  background-color: #f4f4f9;
}

.lablec {
  background-color: #1d2951;
  color: white;
  text-align: center;
  padding: 10px 0;
  width: 100%;
}
</style>
