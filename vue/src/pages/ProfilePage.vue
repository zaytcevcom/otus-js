<template>
  <div v-if="profile" class="profile-container">
    <h1 class="profile-title">Профиль пользователя</h1>
    <div class="profile-info">
      <div class="info-item">
        <span class="info-label">Имя:</span>
        <span class="info-value">{{ profile.name }}</span>
      </div>
      <div class="info-item">
        <span class="info-label">Рейтинг:</span>
        <span class="info-value">{{ profile.rating }}</span>
      </div>
      <div class="info-item">
        <span class="info-label">Решенные задачи:</span>
        <span class="info-value">{{ profile.solvedTasks }}</span>
      </div>
    </div>
    <h2 class="tasks-title">Последние решенные задачи:</h2>
    <ul class="tasks-list">
      <TaskCard v-for="task in tasks" :key="task.id" :task="task" />
    </ul>
  </div>
</template>

<script setup>
  import {useUserStore} from "@/stores/user.ts"
  import {onMounted} from "vue"
  import {storeToRefs} from "pinia";
  import TaskCard from "@/components/TaskCard.vue";

  const userStore = useUserStore()
  const { profile, tasks } = storeToRefs(userStore)

  onMounted(() => {
    userStore.fetchUserProfile()
  });
</script>

<style scoped>
.profile-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;
}

.profile-title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 42px;
}

.profile-info {
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.info-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.info-label {
  font-weight: bold;
}

.info-value {
}

.tasks-title {
  margin-bottom: 15px;
}

.tasks-list {
  list-style: none;
  padding: 0;
}

.task-item {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.task-title {
}

.task-date {
  font-size: 0.9em;
}
</style>
