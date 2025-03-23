<template>
  <div>
    <div>
      <input v-model="search" placeholder="Поиск..." />
      <button @click="filterTasks">Применить фильтр</button>
    </div>
    <div>
      <TaskCard v-for="task in filteredTasks" :key="task.id" :task="task" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useTasksStore } from '@/stores/tasks';
import TaskCard from '@/components/TaskCard.vue';

const tasksStore = useTasksStore();

const search = ref('');

onMounted(() => {
  tasksStore.fetchTasks();
});

const filteredTasks = computed(() =>
    tasksStore.tasks.filter((task) =>
        task.title.toLowerCase().includes(search.value.toLowerCase())
    )
);
</script>
