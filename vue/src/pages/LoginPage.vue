<template>
  <div class="login-form">
    <h2>Вход</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="username">Логин:</label>
        <input
            type="text"
            id="username"
            v-model="username"
            required
        />
      </div>
      <div class="form-group">
        <label for="password">Пароль:</label>
        <input
            type="password"
            id="password"
            v-model="password"
            required
        />
      </div>
      <button type="submit">Войти</button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
    <p v-if="isAuthenticated" class="success">Вы успешно вошли!</p>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import {storeToRefs} from "pinia";
import {useRouter} from "vue-router";

const username = ref('');
const password = ref('');

const authStore = useAuthStore();
const { isAuthenticated, error } = storeToRefs(authStore);

const router = useRouter()

const handleSubmit = async () => {
  await authStore.login(username.value, password.value);
  router.push('/')
};
</script>

<style scoped>
.login-form {
  max-width: 300px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #369f6e;
}

.error {
  color: red;
  margin-top: 10px;
}
</style>
