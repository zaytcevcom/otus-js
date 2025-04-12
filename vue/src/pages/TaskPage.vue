<template>
  <div v-if="task">
    <h1>{{ task.title }}</h1>
    <p>{{ task.description }}</p>
    <div v-for="example in task.examples" :key="example.id">
      <strong>Input:</strong> {{ example.input }} <br />
      <strong>Output:</strong> {{ example.output }}
    </div>

    <div v-if="auth.isAuthenticated">
      <CodeEditor v-model="solution" />
      <button @click="submitSolution">Отправить решение</button>
    </div>

    <CommentSection />
  </div>
</template>

<script lang="ts" setup>

import {useTasksStore} from "@/stores/tasks.ts";
import {onMounted, ref} from "vue";
import {storeToRefs} from "pinia";
import CodeEditor from '@/components/CodeEditor.vue';
import CommentSection from '@/components/CommentSection.vue';
import {useAuthStore} from "@/stores/auth.ts";
//import {instance} from "@/services/axios.ts";

const auth = useAuthStore()

const solution = ref('');
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const tasksStore = useTasksStore();
const { task } = storeToRefs(tasksStore)

onMounted(() => {
  tasksStore.fetchTaskById(+props.id);
});

const submitSolution = async () => {
  //await instance.post(`/tasks/${props.id}/submit`, { solution: solution.value });
  alert('Решение отправлено! ' + solution.value)
};

</script>
