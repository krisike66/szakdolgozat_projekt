<template>
  <div class="tudasanyag-detail">
    <div class="header">
      <button @click="$router.push('/tudasanyagok')" class="back-btn">← Vissza a tudásanyagokhoz</button>
      <h1>{{ tudasanyag.cim }}</h1>
      <p class="meta">
        <span><strong>Szerző:</strong> {{ tudasanyag.szerzo?.felhasznalonev || 'Ismeretlen' }}</span> |
        <span><strong>Módosította:</strong> {{ tudasanyag.modosito?.felhasznalonev || 'Nincs adat' }}</span> |
        <span><strong>Módosítva:</strong> {{ formatDate(tudasanyag.modositva) }}</span>
      </p>
    </div>
    <div class="content">
      <div v-html="tudasanyag.tartalom" class="content-html"></div>
    </div>
    <div v-if="tudasanyag.file" class="letoltes">
      <p><strong>Csatolt fájl:</strong></p>
      <a :href="`http://localhost:3000/uploads/${tudasanyag.file}`" target="_blank" download>
        {{ tudasanyag.file }}
      </a>
    </div>
    <div class="cimkek">
      <span v-for="cimke in tudasanyag.cimkek" :key="cimke.cimke_id" class="cimke">
        {{ cimke.nev }}
      </span>
    </div>
    <div class="muvetek">
        <button v-if="canEditOrDelete" @click="onEdit" class="edit-btn">Szerkesztés</button>
        <button v-if="canEditOrDelete" @click="onDelete" class="delete-btn">Törlés</button>
        <button
          v-if="canApprove"
          @click="onApprove"
          class="approve-btn"
        >Jóváhagyás</button>
    </div>
  </div>
<div class="komment-ertekeles-szekcio">
  <h2>Értékelés</h2>
  <div class="csillagok">
    <img 
      v-for="n in 5"
      :key="n"
      :src="n <= userErtekeles ? csillagPath : uresCsillagPath"
      :alt="`${n} csillag`"
      class="csillag"
      :class="{ disabled: hasRated }"
      @click="!hasRated && submitErtekeles(n)"
    />
  </div>
  <p v-if="atlagErtekeles">Átlag: {{ parseFloat(atlagErtekeles).toFixed(1) }}/5</p>

  <h2>Hozzászólások</h2>
  <form @submit.prevent="submitKomment">
    <textarea v-model="ujKomment" placeholder="Írj egy hozzászólást..." rows="3"></textarea>
    <button type="submit">Küldés</button>
  </form>

  <ul class="komment-lista">
    <li v-for="komment in kommentek" :key="komment.id">
      <strong>{{ komment.user?.felhasznalonev || 'Anonim' }}</strong>: {{ komment.szoveg }}
    </li>
  </ul>
</div>



<div v-if="hasonlok.length" class="hasonlo-box">
  <h3>Ez is érdekelhet:</h3>
  <ul>
    <li v-for="item in hasonlok" :key="item.tudasanyag_id">
      <router-link :to="`/tudasanyagok/${item.tudasanyag_id}`">
        {{ item.cim }}
      </router-link>
    </li>
  </ul>
</div>
</template>

<script>
import api from '../api';

export default {
  data() {
    return {
      hasRated: false,
      ertekeltMar: false,
      tudasanyag: {},
      user: {},
      kommentek: [],
      ujKomment: '',
      userErtekeles: 0,
      atlagErtekeles: null,
      csillagPath: require('@/assets/csillag.png'),
      uresCsillagPath: require('@/assets/ures_csillag.png'),
      hasonlok: []
    };
  },
  async mounted() {
    await this.fetchTudasanyag();
    await this.fetchKommentek();
    await this.fetchAtlagErtekeles();
    await this.fetchUserErtekeles();
  },
  computed: {
      canEditOrDelete() {
        return (
          this.user.role === 'admin' ||
          this.user.user_id === this.tudasanyag.letrehozva_altala
        );
      },
      canApprove() {
        return (
          (this.user.role === 'admin' || this.user.role === 'auditer') &&
          this.tudasanyag.audit_approved === false
        );
      }
    },
  created() {
    this.fetchTudasanyag();
    this.fetchProfile();
    this.fetchKommentek();
    this.fetchAtlagErtekeles();
    this.fetchHasonlo();
  },
  methods: {
        async fetchProfile() {
        try {
          const token = localStorage.getItem('userToken');
          const response = await api.get('/users/profile', {
            headers: { Authorization: `Bearer ${token}` }
          });
          this.user = response.data;
        } catch (error) {
          console.error("Profil betöltési hiba:", error);
        }
      },

        async fetchHasonlo() {
          const token = localStorage.getItem("userToken");
          const id = this.$route.params.id;
          try {
            const res = await api.get(`/tudasanyagok/${id}/hasonlok`, {
              headers: { Authorization: `Bearer ${token}` }
            });
            this.hasonlok = res.data;
          } catch (err) {
            console.error("Ajánlott tartalmak hiba:", err);
          }
        },


      async fetchUserErtekeles() {
        try {
          const token = localStorage.getItem('userToken');
          if (!token) return;

          const response = await api.get(`/ertekeles/${this.$route.params.id}/user`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          if (response.data.ertekeles) {
            this.userErtekeles = response.data.ertekeles;
            this.ertekeltMar = true;
          }
        } catch (error) {
          console.error('Saját értékelés lekérése hiba:', error);
        }
    },

    async fetchTudasanyag() {
      try {
        const response = await api.get(`/tudasanyagok/${this.$route.params.id}`, {
          withCredentials: true,
          params: {
            includeCimkek: true 
          }
        });
        this.tudasanyag = response.data || {};
        console.log("Tudasanyag adatok:", this.tudasanyag);
      } catch (error) {
        console.error('Hiba a tudásanyag részleteinek lekérésekor:', error);
      }
    },


    async fetchKommentek() {
      try {
        const res = await api.get(`/kommentek/${this.$route.params.id}`);
        this.kommentek = res.data;
      } catch (e) {
        console.error("Kommentek betöltése hiba:", e);
      }
    },
    async submitKomment() {
      try {
        const token = localStorage.getItem('userToken');
        await api.post('/komment', {
          szoveg: this.ujKomment,
          tudasanyag_id: this.$route.params.id
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.ujKomment = '';
        this.fetchKommentek();
      } catch (e) {
        console.error("Komment küldés hiba:", e);
      }
    },
    async fetchAtlagErtekeles() {
      try {
        const res = await api.get(`/ertekeles/atlag/${this.$route.params.id}`);
        this.atlagErtekeles = res.data.atlag;
      } catch (e) {
        console.error("Átlagértékelés lekérés hiba:", e);
      }
    },
    async submitErtekeles(ertek) {
      if (this.hasRated) {
        alert("Már értékelted ezt a tudásanyagot.");
        return;
      }
      try {
        const token = localStorage.getItem('userToken');
        await api.post('/ertekeles', {
          ertekeles: ertek,
          tudasanyag_id: this.$route.params.id
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.userErtekeles = ertek;
        this.ertekeltMar = true;
        this.fetchAtlagErtekeles();
      } catch (e) {
        console.error("Értékelés hiba:", e);
      }
    },

    async onEdit() {
      this.$router.push({ name: 'EditTudasanyag', params: { id: this.tudasanyag.tudasanyag_id } });
    },

    async onDelete() {
      if (!confirm('Biztosan törölni szeretnéd ezt a tudásanyagot?')) return;
      try {
        const token = localStorage.getItem('userToken');
        await api.delete(`/tudasanyagok/${this.tudasanyag.tudasanyag_id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.$router.push('/tudasanyagok');
      } catch (error) {
        console.error("Törlés hiba:", error);
        alert("Hiba történt a törlés során.");
      }
    },

    async onApprove() {
      try {
        const token = localStorage.getItem('userToken');
        await api.patch(`/tudasanyagok/${this.tudasanyag.tudasanyag_id}/approve`, null, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert("Sikeresen jóváhagyva!");
        this.fetchTudasanyag();
      } catch (error) {
        console.error("Jóváhagyás hiba:", error);
        alert("Hiba történt a jóváhagyás során.");
      }
    },

    formatDate(dateString) {
      if (!dateString) return 'Nincs adat';
      const date = new Date(dateString);
      return date.toLocaleDateString('hu-HU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
  }
};
</script>


<style scoped>
.tudasanyag-detail {
  max-width: 900px;
  margin: 40px auto;
  padding: 30px;
  background-color: #ffffff;
  border-left: 6px solid #007bff;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  font-family: "Segoe UI", sans-serif;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.header {
  margin-bottom: 20px;
}

.header h1 {
  color: #222;
  margin-bottom: 10px;
  font-size: 2em;
  word-break: break-word;
}

.header .meta {
  color: #6c757d;
  margin-top: 10px;
  font-size: 0.9em;
}

.content {
  font-size: 1.2em;
  line-height: 1.6em;
  color: #343a40;
}

.content p {
  font-size: 1.1em;
  line-height: 1.6em;
  color: #444;
  margin-top: 20px;
  white-space: pre-line;
  word-break: break-word;
}

.cimkek {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.cimke {
  background-color: #007bff;
  color: #fff;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 0.9em;
}

.back-btn {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9em;
  transition: background-color 0.3s ease;
  margin-bottom: 20px;
}

.back-btn:hover {
  background-color: #0056b3;
}


.muvetek {
  margin-top: 30px;
  display: flex;
  gap: 10px;
}

.edit-btn,
.delete-btn,
.approve-btn {
  padding: 8px 16px;
  font-size: 0.9em;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border: none;
}

.edit-btn {
  background-color: #ffc107;
  color: #fff;
}
.edit-btn:hover {
  background-color: #e0a800;
}

.delete-btn {
  background-color: #dc3545;
  color: #fff;
}
.delete-btn:hover {
  background-color: #c82333;
}

.approve-btn {
  background-color: #28a745;
  color: #fff;
}
.approve-btn:hover {
  background-color: #218838;
}

.komment-ertekeles-szekcio {
  margin-top: 40px;
  padding-top: 30px;
  border-top: 2px solid #ccc;
}

.komment-ertekeles-szekcio textarea {
  width: 100%;
  padding: 10px;
  border-radius: 6px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  font-size: 1em;
}

.komment-ertekeles-szekcio button {
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.csillagok {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

.csillag {
  width: 32px;
  height: 32px;
  cursor: pointer;
}

.komment-lista {
  margin-top: 20px;
  list-style: none;
  padding: 0;
}

.komment-lista li {
  margin-bottom: 10px;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 6px;
}


.star.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}


.hasonlo-box {
  background-color: #f0f8ff;
  border-left: 5px solid #007bff;
  padding: 16px 24px;
  margin-top: 40px;
  border-radius: 8px;
  font-family: 'Segoe UI', sans-serif;
  box-shadow: 0 2px 6px rgba(0, 123, 255, 0.1);
}

.hasonlo-box h3 {
  color: #0056b3;
  margin-bottom: 10px;
  font-size: 1.2em;
  font-weight: bold;
}

.hasonlo-box ul {
  list-style: none;
  padding-left: 0;
  margin: 0;
}

.hasonlo-box li {
  margin-bottom: 8px;
}

.hasonlo-box a {
  text-decoration: none;
  color: #007bff;
  transition: color 0.3s ease;
}

.hasonlo-box a:hover {
  color: #0056b3;
  text-decoration: underline;
}


.letoltes {
  margin-top: 20px;
  padding: 10px;
  background-color: #f5f5f5;
  border-left: 4px solid #007bff;
  border-radius: 6px;
}

.letoltes a {
  color: #007bff;
  text-decoration: none;
  font-weight: bold;
}

.letoltes a:hover {
  text-decoration: underline;
}


.content-html {
  font-size: 1.1em;
  line-height: 1.6em;
  color: #333;
}
</style>
