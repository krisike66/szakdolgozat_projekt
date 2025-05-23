<template>
  <div class="login-page">
    <h2>Bejelentkezés</h2>
    <form @submit.prevent="onSubmit">
      <input v-model="email" type="email" placeholder="Email" required />
      
      <div class="password-wrapper">
        <input :type="showPassword ? 'text' : 'password'" v-model="password" placeholder="Jelszó" required />
        <button type="button" class="toggle-btn" @click="togglePassword">
          {{ showPassword ? 'Elrejt' : 'Mutat' }}
        </button>
      </div>
      
      <button type="submit" :disabled="loading">
        {{ loading ? 'Betöltés...' : 'Bejelentkezés' }}
      </button>
      
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script>
import api from '../api';

export default {
  data() {
    return {
      email: '',
      password: '',
      showPassword: false,
      errorMessage: '',
      loading: false
    };
  },
  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
    async onSubmit() {
      this.errorMessage = '';
      this.loading = true;
      try {
        const response = await api.post('/users/login', {
          email: this.email,
          password: this.password
        });
        console.log('Bejelentkezés sikeres:', response.data);
        if (response.data.token) {
          localStorage.setItem('userToken', response.data.token);
        }
        this.$router.push('/home');
      } catch (error) {
        console.error('Bejelentkezési hiba:', error);
        this.errorMessage = 'Hiba történt a bejelentkezés során. Kérjük, próbáld újra!';
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
.login-page {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #ffffff;
  color: #333;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

form {
  display: flex;
  flex-direction: column;
}

input {
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid #000000;
  border-radius: 4px;
  font-size: 1em;
}

.password-wrapper {
  display: flex;
  align-items: center;
  position: relative;
}

.password-wrapper input {
  width: 100%;
  padding-right: 80px;
}

.toggle-btn {
  position: absolute;
  right: 10px;
  background: none;
  border: none;
  color: #363636;
  cursor: pointer;
  font-size: 0.9em;
}

button[type="submit"] {
  padding: 12px;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s;
}

button[type="submit"]:hover {
  background-color: #555;
}

button[disabled] {
  opacity: 0.7;
  cursor: not-allowed;
}

.error {
  color: red;
  text-align: center;
  margin-top: 10px;
}
</style>
