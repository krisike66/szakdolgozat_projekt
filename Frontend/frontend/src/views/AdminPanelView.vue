<template>
    <div class="admin-panel">
      <h1>Admin Panel</h1>
      
      <!-- Felhasználó létrehozó űrlap -->
      <div class="create-user-form">
        <form @submit.prevent="onSubmit">
          <div class="form-group">
            <label>Felhasználónév:</label>
            <input v-model="userName" type="text" required />
          </div>
          <div class="form-group">
            <label>Email:</label>
            <input v-model="email" type="email" required />
          </div>
          <div class="form-group">
            <label>Jelszó:</label>
            <input v-model="password" type="password" required />
          </div>
          <div class="form-group">
            <label>Szerepkör:</label>
            <select v-model="role">
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="auditer">Auditer</option>
            </select>
          </div>
          <button type="submit">Felhasználó létrehozása</button>
        </form>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        <p v-if="successMessage" class="success">{{ successMessage }}</p>
      </div>
  
      <!-- Felhasználók lista -->
      <div class="user-list-container">
        <div class="user-list-header">
          <div class="header-item">
            ID
            <button @click="toggleSortOrder" class="sort-btn">
              <span v-if="sortOrder === 'asc'">▲</span>
              <span v-else>▼</span>
            </button>
          </div>
          <div class="header-item">Felhasználónév</div>
          <div class="header-item">Email</div>
          <div class="header-item">Szerepkör</div>
          <div class="header-item">Műveletek</div>
        </div>
        <div class="user-list">
          <div v-for="user in users" :key="user.user_id" class="user-item">
            <div class="item">{{ user.user_id }}</div>
            <div class="item">{{ user.felhasznalonev }}</div>
            <div class="item">{{ user.email }}</div>
            <div class="item">{{ user.role }}</div>
            <div class="item">
              <button @click="onEditUser(user)">Szerkesztés</button>
              <button @click="onDeleteUser(user.user_id)">Törlés</button>
            </div>
          </div>
        </div>
      </div>
    </div>


    <!-- Log lista -->
    <div class="log-list">
      <h2>Rendszerlogok</h2>
        <ul>
          <li v-for="log in logs" :key="log.id">
            [{{ new Date(log.timestamp).toLocaleString() }}] 
            <strong>{{ log.user?.felhasznalonev || 'Ismeretlen' }}</strong>
            {{ log.action }}
          </li>
        </ul>
    </div>
  </template>

  

  
  <script>
  import api from '../api';
  
  export default {
    name: "AdminPanelView",
    data() {
      return {
        userName: '',
        email: '',
        password: '',
        role: 'user',
        errorMessage: '',
        successMessage: '',
        users: [],
        logs: [],
        sortOrder: 'asc'
      };
    },
    created() {
      this.fetchUsers();
      this.fetchLogs();
    },
    methods: {
      async onSubmit() {
        this.errorMessage = '';
        this.successMessage = '';
        try {
          await api.post('/users/addUser', {
            userName: this.userName,
            email: this.email,
            password: this.password,
            role: this.role
          }, { withCredentials: true });
          await api.post('/logs', {
            action: `Felhasználó létrehozva: ${this.userName}`
          }, {
            withCredentials: true
          });
          this.successMessage = 'Felhasználó sikeresen létrehozva!';
          // Űrlap ürítése
          this.userName = '';
          this.email = '';
          this.password = '';
          this.role = 'user';
          this.fetchUsers();
        } catch (error) {
          console.error("Felhasználó létrehozási hiba:", error);
          this.errorMessage = 'Hiba történt a felhasználó létrehozása során.';
        }
      },
      async fetchUsers() {
        try {
          const response = await api.get(`/users?sort=${this.sortOrder}`, { withCredentials: true });
          this.users = response.data;
        } catch (error) {
          console.error("Felhasználók lekérése hiba:", error);
          this.errorMessage = 'Hiba történt a felhasználók lekérése során.';
        }
      },
      async fetchLogs() {
        try {
          const response = await api.get('/logs', { withCredentials: true });
          console.log("Log válasz:", response.data); // ← Nézd meg a struktúrát
          this.logs = response.data;
        } catch (error) {
          console.error('Logok lekérése hiba:', error);
        }
      },
      toggleSortOrder() {
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
        this.fetchUsers();
      },
      async onDeleteUser(userId) {
        try {
          await api.delete(`/users/${userId}`, { withCredentials: true });
          await api.post('/logs', {
            action: `Felhasználó törölve: ID=${userId}`
          }, { withCredentials: true });
          this.fetchUsers();
        } catch (error) {
          console.error("Felhasználó törlése hiba:", error);
        }
      },
      onEditUser(user) {
        this.$router.push({ name: 'EditUser', params: { userId: user.user_id } });
      }
    }
  };
  </script>
  
  <style scoped>
  .admin-panel {
    max-width: 800px;
    margin: 40px auto;
    padding: 20px;
    background-color: #f4f4f4;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  /* Létrehozó űrlap stílusok */
  .create-user-form {
    background-color: #fff;
    border: 1px solid #ddd;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 30px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-group label {
    display: block;
    font-weight: 600;
    margin-bottom: 5px;
    color: #333;
  }
  
  .form-group input,
  .form-group select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
  }
  
  /* Gombok */
  button {
    padding: 10px 20px;
    background-color: #007bff;
    border: none;
    color: #fff;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    margin-top: 10px;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  .sort-btn {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    margin-left: 5px;
  }
  
  /* Üzenetek */
  .error {
    color: #d9534f;
    margin-top: 10px;
  }
  
  .success {
    color: #5cb85c;
    margin-top: 10px;
  }
  
  /* Felhasználók lista */
  .user-list-container {
    margin-top: 30px;
  }
  
  .user-list-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #e9ecef;
    padding: 10px 15px;
    font-weight: bold;
    margin-bottom: 10px;
    border-radius: 4px;
  }
  
  .header-item {
    flex: 1;
    text-align: center;
  }
  
  .user-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .user-item {
    display: flex;
    align-items: center;
    padding: 12px 15px;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  .user-item .item {
    flex: 1;
    text-align: center;
  }
  
  .user-item button {
    padding: 6px 12px;
    margin: 0 5px;
    font-size: 0.9rem;
  }

  .log-list-container {
  margin-top: 40px;
  background-color: #fff;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 6px;
}
.log-list-container ul {
  list-style: none;
  padding: 0;
}
.log-list-container li {
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}

  </style>
  