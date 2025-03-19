<template>
  <NavBarComponent />
  <router-view />
  <FooterComponent />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import './assets/tailwind.css';
import NavBarComponent from './components/NavBarComponent.vue';
import FooterComponent from './components/FooterComponent.vue';

export default defineComponent({
  name: 'App',
  components: {
    NavBarComponent,
    FooterComponent
  }
});
</script>

<style>
body {
  background: rgb(215, 215, 215);
}
</style>
