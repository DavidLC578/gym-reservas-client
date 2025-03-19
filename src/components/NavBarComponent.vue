<template>
  <nav class="flex justify-between items-center w-full bg-white p-4">
    <span class="text-xl font-bold">GYM</span>
    <ul class="flex justify-center space-x-7 font-semibold">
      <li :class="{ 'relative': true }">
        <router-link to="/" class="text-lg">Welcome</router-link>
        <div :class="{ 'absolute top-7 left-0 w-full h-1 bg-purple-500 transform transition-all duration-300 scale-x-100': isActive('/') }"></div>
      </li>
      <li :class="{ 'relative': true }">
        <router-link to="/classes" class="text-lg">Classes</router-link>
        <div :class="{ 'absolute top-7 left-0 w-full h-1 bg-purple-500 transform transition-all duration-300 scale-x-100': isActive('/classes') }"></div>
      </li>
      <li :class="{ 'relative': true }">
        <router-link to="/join" class="text-lg">Join the Gym</router-link>
        <div :class="{ 'absolute top-7 left-0 w-full h-1 bg-purple-500 transform transition-all duration-300 scale-x-100': isActive('/join') }"></div>
      </li>
    </ul>
    <ul class="flex justify-center space-x-7 font-semibold">
      <li class="relative">
        <router-link to="/login" class="text-lg">Login</router-link>
      </li>
      <li class="relative">
        <router-link to="/register" class="text-lg">Register</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  methods: {
    isActive(route) {
      return this.$route.path === route;
    }
  }
};
</script>