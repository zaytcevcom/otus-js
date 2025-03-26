<script setup lang="ts">
import {RouterLink, RouterView, useRouter} from 'vue-router'
import {useAuthStore} from "@/stores/auth.ts";

const auth = useAuthStore()
const router = useRouter()

function logout() {
  auth.logout()
  router.push('/login')
}
</script>

<template>
  <div class="app">
    <header class="header">
      <RouterLink to="/" class="nav-link">Задачи</RouterLink>
      <nav v-if="auth.isAuthenticated" class="auth-nav">
        <RouterLink to="/profile" class="nav-link">Профиль</RouterLink>
        <button @click="logout" class="logout-button">Выйти</button>
      </nav>
      <nav v-else class="auth-nav">
        <RouterLink to="/login" class="nav-link">Войти</RouterLink>
      </nav>
    </header>

    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 800px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #2c3e50;
  color: white;
  border-radius: 8px;
}

.nav-link {
  color: white;
  text-decoration: none;
  margin: 0 0.5rem;
  font-size: 1.1rem;
}

.nav-link:hover {
  text-decoration: underline;
}

.auth-nav {
  display: flex;
  align-items: center;
}

.logout-button {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

.logout-button:hover {
  background-color: #c0392b;
}

.main-content {
  flex: 1;
  padding: 2rem;
}
</style>
