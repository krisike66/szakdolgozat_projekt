<template>
  <div class="login-container">
    <div class="login-card">
      <h2>Bejelentkezés</h2>
      <form @submit.prevent="onSubmit">
        <div class="form-group">
          <input v-model="email" type="email" placeholder="Email" required />
        </div>
        <div class="form-group">
          <input v-model="password" type="password" placeholder="Jelszó" required />
        </div>
        <button type="submit">Bejelentkezés</button>
      </form>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>
import api from '../api';

export default {
  name: 'LoginView',
  data() {
    return {
      email: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    onSubmit() {
      api.post('/login', { email: this.email, password: this.password })
        .then(response => {
          console.log('Bejelentkezés sikeres', response.data);
          // Sikeres bejelentkezés után irányítsd át a felhasználót a főoldalra:
          this.$router.push('/home');
        })
        .catch(error => {
          console.error('Hiba történt a bejelentkezés során.', error);
          this.errorMessage = 'Hiba történt a bejelentkezés során.';
        });
    }
  }
};
</script>

<style scoped>
/* Konténer a központi elhelyezkedéshez */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f4f6f8;
}

/* Kártya stílus a login űrlaphoz */
.login-card {
  background: #ffffff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.login-card h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333333;
}

/* Űrlap mezők stílusa */
.form-group {
  margin-bottom: 1rem;
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #dddddd;
  border-radius: 4px;
  font-size: 1rem;
}

/* Gomb stílus */
button[type="submit"] {
  width: 100%;
  padding: 0.75rem;
  background-color: #007BFF;
  border: none;
  border-radius: 4px;
  color: #ffffff;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button[type="submit"]:hover {
  background-color: #0056b3;
}

/* Hibaüzenet stílus */
.error {
  color: red;
  margin-top: 1rem;
  text-align: center;
}
</style>
