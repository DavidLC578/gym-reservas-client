<template>
    <nav class="lg:flex lg:justify-between items-center w-full bg-white p-4">
        <div class="flex justify-between items-center">
            <span class="text-xl font-bold">GYM</span>
            <button @click="toggleMenu" class="lg:hidden p-2">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
            </button>
        </div>
        <ul :class="{ 'hidden': !isMenuOpen, 'flex flex-col': isMenuOpen }"
            class="lg:flex lg:flex-row justify-center md:items-center lg:space-x-7 font-semibold py-2 space-y-2 lg:space-y-0">
            <li :class="{ 'relative': true }">
                <router-link to="/" class="text-lg">Welcome</router-link>
                <div
                    :class="{ 'absolute top-7 left-0 w-full h-1 bg-purple-500 transform transition-all duration-300 scale-x-100': isActive('/') }">
                </div>
            </li>
            <li :class="{ 'relative': true }">
                <router-link to="/classes" class="text-lg">Classes</router-link>
                <div
                    :class="{ 'absolute top-7 left-0 w-full h-1 bg-purple-500 transform transition-all duration-300 scale-x-100': isActive('/classes') }">
                </div>
            </li>
            <li :class="{ 'relative': true }">
                <router-link to="/join" class="text-lg">Join the Gym</router-link>
                <div
                    :class="{ 'absolute top-7 left-0 w-full h-1 bg-purple-500 transform transition-all duration-300 scale-x-100': isActive('/join') }">
                </div>
            </li>
        </ul>
        <ul class="lg:flex justify-center space-x-7 font-semibold">
            <li v-if="!isAuthenticated" class="relative">
                <router-link to="/login" class="text-lg">Login</router-link>
            </li>
            <li v-if="!isAuthenticated" class="relative">
                <router-link to="/register" class="text-lg">Register</router-link>
            </li>
            <li v-if="isAuthenticated" class="relative">
                <router-link to="/profile" class="text-lg">Profile</router-link>
            </li>
            <li v-if="isAuthenticated" class="relative">
                <button @click="logout" class="text-lg">Logout</button>
            </li>
        </ul>
    </nav>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
    setup() {
        const isMenuOpen = ref(false);
        const route = useRoute();
        const router = useRouter();

        const isAuthenticated = computed(() => !!sessionStorage.getItem("userToken"));

        const toggleMenu = () => {
            isMenuOpen.value = !isMenuOpen.value;
        };

        const isActive = (path: string) => {
            return route.path === path;
        };

        const logout = () => {
            sessionStorage.removeItem("userToken");
            router.push("/login");
        };

        return {
            isMenuOpen,
            isAuthenticated,
            toggleMenu,
            isActive,
            logout
        };
    }
});
</script>