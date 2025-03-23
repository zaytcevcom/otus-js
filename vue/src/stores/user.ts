import { defineStore } from 'pinia';
import {ref} from "vue";
// import {instance} from "../services/axios.ts";

type profileType = {
    name: string,
    rating: number,
    solvedTasks: number
}

type taskType = {
    id: number,
    title: string,
    date: string
}

export const useUserStore = defineStore('user', () => {
    const profile = ref<profileType | null>(null)
    const tasks = ref<taskType[]>([])

    async function fetchUserProfile() {
        // const response = await instance.get('/auth/profile');
        // profile.value = response.data;

        profile.value = {
            name: 'Konstantin',
            rating: 5,
            solvedTasks: 10,
        }

        tasks.value = [
            {
                id: 3,
                title: 'Проблема #3',
                date: '23.03.2025',
            },
            {
                id: 2,
                title: 'Проблема #2',
                date: '20.03.2025',
            },
            {
                id: 1,
                title: 'Проблема #1',
                date: '18.03.2025',
            },
        ]
    }

    return {
        profile,
        tasks,
        fetchUserProfile
    }
});
