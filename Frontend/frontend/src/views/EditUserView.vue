<template>
    <div class="edit-user">
      <h1>Felhasználó szerkesztése</h1>
      <form @submit.prevent="updateUser">
        <div class="form-group">
          <label>Felhasználónév:</label>
          <input v-model="userName" type="text" required />
        </div>
        <div class="form-group">
          <label>Email:</label>
          <input v-model="email" type="email" required />
        </div>
        <div class="form-group">
          <label>Szerepkör:</label>
          <select v-model="role">
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit">Mentés</button>
        <button type="button" @click="cancelEdit">Mégse</button>
      </form>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      <p v-if="successMessage" class="success">{{ successMessage }}</p>
    </div>
  </template>
  
  <script>
  import api from '../api';
  
  export default {
    name: "EditUserView",
    props: ['userId'],
    data() {
      return {
        userName: '',
        email: '',
        role: '',
        errorMessage: '',
        successMessage: ''
      }
    },
    created() {
      this.fetchUser();
    },
    methods: {
      async fetchUser() {
        try {
          const response = await api.get(`/users/${this.userId}`, { withCredentials: true });
          const user = response.data;
          // Győződj meg róla, hogy a megfelelő mezőneveket használod (pl.: felhasznalonev vagy userName)
          this.userName = user.felhasznalonev || user.userName;
          this.email = user.email;
          this.role = user.role;
        } catch (error) {
          console.error('Hiba a felhasználó lekérésekor:', error);
          this.errorMessage = 'Hiba történt a felhasználó adatainak lekérésekor.';
        }
      },
      async updateUser() {
        this.errorMessage = '';
        this.successMessage = '';
        try {
          await api.put(`/users/${this.userId}`, {
            userName: this.userName,
            email: this.email,
            role: this.role
          }, { withCredentials: true });
          this.successMessage = 'Felhasználó adatai sikeresen frissítve!';
        } catch (error) {
          console.error('Felhasználó frissítési hiba:', error);
          this.errorMessage = 'Hiba történt a felhasználó frissítése során.';
        }
      },
      cancelEdit() {
        this.$router.push('/admin');
      }
    }
  };
  </script>
  
  <style scoped>
  .edit-user {
    max-width: 500px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f8f8f8;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  input, select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button {
    margin-right: 10px;
    padding: 10px 15px;
    background-color: #007bff;
    border: none;
    color: #fff;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  .error {
    color: red;
    margin-top: 10px;
  }
  
  .success {
    color: green;
    margin-top: 10px;
  }
  </style>
  