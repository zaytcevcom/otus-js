import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
    const isAuthenticated = ref<boolean>(false)
    const error = ref<string>('')
    const token = ref<string>('')

    function login(username: string, password: string) {
        try {
            if (username === 'admin' && password === '123456') {
                isAuthenticated.value = true;
                error.value = '';
            } else {
                throw new Error('Неверный логин или пароль');
            }
        } catch (err) {
            error.value = err.message;
            isAuthenticated.value = false;
        }
    }

    function logout() {
        isAuthenticated.value = false
        error.value = ''
        token.value = ''
    }

    return {
        isAuthenticated,
        error,
        token,
        login,
        logout
    }
})
