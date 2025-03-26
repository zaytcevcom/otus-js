import { defineStore } from 'pinia';
// import {instance} from "../services/axios.ts";
import {ref} from "vue";
import {stubTasks} from "@/services/stubs.ts";

type taskType = {
    id: number,
    title: string,
    description: string,
    date: string
}

export const useTasksStore = defineStore('tasks', () => {
    const tasks = ref<taskType[]>([])
    const task = ref<taskType | null>(null)

    async function fetchTasks() {
        // const response = await instance.get('/problems');
        // tasks.value = response.data;

        tasks.value = stubTasks
    }
    async function fetchTaskById(id: number) {
        // const response = await instance.get(`/problems/${id}`);
        // currentTask.value = response.data;

        task.value = stubTasks[id - 1];
    }

    return {
        tasks,
        task,
        fetchTasks,
        fetchTaskById
    }
});
