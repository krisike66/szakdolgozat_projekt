<template>
    <div class="min-h-screen flex flex-col">
      <!-- Fejléc / Menüsor -->
      <header class="bg-gray-900 text-white p-4 shadow-lg flex items-center justify-between">
        <MenusorKomponens />
      </header>
  
      <!-- Fő tartalom -->
      <main class="flex-1 bg-gray-100 p-6 overflow-y-auto">
        <router-view />
      </main>
  
      <!-- Lábléc -->
      <footer class="bg-gray-900 text-white text-center py-3">
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
  /* Általános stílusok, ha szükséges */
  body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f9;
  }
  </style>
  