<template>
  <NavBarComponent />
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import './assets/tailwind.css';
import NavBarComponent from './components/NavBarComponent.vue';

export default defineComponent({
  name: 'App',
  components: {
    NavBarComponent
  }
});
</script>

<style>
body {
  background: rgb(229, 229, 229);
}
</style>
