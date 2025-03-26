import { createRouter, createWebHistory } from 'vue-router';
import TasksPage from '@/pages/TasksPage.vue';
import TaskPage from '@/pages/TaskPage.vue';
import ProfilePage from '@/pages/ProfilePage.vue';
import LoginPage from '@/pages/LoginPage.vue';

const routes = [
    { path: '/', name: 'TasksPage', component: TasksPage },
    { path: '/task/:id', name: 'TaskPage', component: TaskPage, props: true },
    { path: '/profile', name: 'ProfilePage', component: ProfilePage },
    { path: '/login', name: 'LoginPage', component: LoginPage },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
