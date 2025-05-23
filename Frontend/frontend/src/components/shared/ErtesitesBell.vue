<template>
  <div class="ertesites-wrapper">
    <div class="bell" @click="toggleDropdown">
      🔔
      <span v-if="unreadCount > 0" class="badge">{{ unreadCount }}</span>
    </div>
    <div v-if="showDropdown" class="dropdown">
      <p v-if="unreadErtesitesek.length === 0">Nincsenek új értesítések.</p>
        <ul>
          <li v-for="ert in unreadErtesitesek" :key="ert.id" class="unread">
            {{ ert.uzenet }}
          </li>
        </ul>
      <button v-if="unreadCount > 0" @click="markAllAsRead">Mind olvasott</button>
    </div>
  </div>
</template>

<script>
import api from "@/api";

export default {
  data() {
    return {
      ertesitesek: [],
      showDropdown: false
    };
  },
  mounted() {
    this.fetchErtesitesek();
    setInterval(this.fetchErtesitesek, 60000);
  },
  computed: {
    unreadCount() {
      return this.ertesitesek.filter(e => !e.olvasott).length;
    },
    unreadErtesitesek() {
      return this.ertesitesek.filter(e => !e.olvasott);
    }
  },
  created() {
  },
  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    async fetchErtesitesek() {
      try {
        const token = localStorage.getItem("userToken");
        const response = await api.get("/ertesitesek", {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.ertesitesek = response.data;
      } catch (error) {
        console.error("Értesítések lekérési hiba:", error);
      }
    },
    async markAllAsRead() {
      try {
        const token = localStorage.getItem("userToken");
        await api.patch("/ertesitesek/read/all", null, {
          headers: { Authorization: `Bearer ${token}` }
        });
        await this.fetchErtesitesek();
      } catch (error) {
        console.error("Olvasottra állítás hiba:", error);
      }
    }
  }
};
</script>

<style scoped>
.ertesites-wrapper {
  position: relative;
  display: inline-block;
}

.bell {
  cursor: pointer;
  font-size: 24px;
  position: relative;
}

.badge {
  background-color: red;
  color: rgb(17, 9, 136);
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 12px;
  position: absolute;
  top: -8px;
  right: -8px;
}

.dropdown {
  position: absolute;
  top: 30px;
  right: 0;
  background-color: white;
  box-shadow: 0 0 6px rgba(0,0,0,0.15);
  border-radius: 6px;
  padding: 10px;
  width: 240px;
  z-index: 1000;
}

.dropdown ul {
  list-style: none;
  margin: 0;
  padding: 0;
  max-height: 200px;
  overflow-y: auto;
}

.dropdown li {
  padding: 6px;
  border-bottom: 1px solid #eee;
  color: blue;
}

.unread {
  font-weight: bold;
}
</style>
