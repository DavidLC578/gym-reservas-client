<template>
    <div class="flex justify-center items-center h-screen">
        <form @submit.prevent="handleLogin" class="flex flex-col gap-4 p-6 bg-white rounded-lg shadow-lg">
            <input type="text" placeholder="Name" v-model="user.name"
                class="p-2 border-2 border-gray-500 rounded text-gray-900" />
            <input type="password" placeholder="Password" v-model="user.password"
                class="p-2 border-2 border-gray-500 rounded text-gray-900" />
            <button type="submit"
                class="bg-orange-500 hover:bg-orange-600 text-gray-900 px-6 py-3 rounded-full font-semibold transition-all">Login</button>
        </form>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { User } from '../interfaces/User';
import { login } from '../services/AuthService';
import { useRouter } from 'vue-router';

export default defineComponent({
    data() {
        return {
            user: {} as User
        };
    },
    mounted() {
        const router = useRouter();
        const token = sessionStorage.getItem('userToken');
        if (token) {
            router.push({ name: 'Welcome' });
        }
    },
    methods: {
        async handleLogin() {
            const res = await login(this.user);
            if (res.status === 200) {
                sessionStorage.setItem('userToken', res.data.token);
                this.$router.push({ name: 'Welcome' });
            }
        }
    }
});
</script>