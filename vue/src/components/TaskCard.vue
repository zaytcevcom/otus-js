<template>
  <div class="task-card">
    <router-link :to="`/task/${task.id}`">
      <h3>{{ task.title }}</h3>
      <p>Дата: {{ task.date }}</p>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

interface Task {
  id: number;
  title: string;
  date: string;
}

const props = defineProps<{
  task: Task;
}>();
</script>

<style scoped>
.task-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.task-card h3 {
  margin: 0 0 8px 0;
  font-size: 1.25rem;
}

.task-card p {
  margin: 0;
  color: #666;
}

a {
  text-decoration: none;
  color: inherit;
}
</style>
