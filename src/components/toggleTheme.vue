<script setup>
  import { useTogglethemeStore } from "@/store/toggletheme.js";
  const togglethemeStore = useTogglethemeStore();

  togglethemeStore.initPreferTheme();
</script>

<!-- https://vueuse.org/core/useDark/ -->

<template>
  <button
    type="button"
    class="toggle-theme"
    :class="{isdark: togglethemeStore.isDarkTheme}"
    @click="togglethemeStore.changeTheme"
  >
    <span v-if="togglethemeStore.isDarkTheme" class="material-symbols-outlined">light_mode</span>
    <span v-else class="material-symbols-outlined">dark_mode</span>

    <span v-if="togglethemeStore.isDarkTheme" class="visually-hidden">Thème clair</span>
    <span v-else class="visually-hidden">Thème sombre</span>
  </button>
</template>

<style lang="scss">
#app {
  .toggle-theme {
    background-color: var(--toggle-theme-background);
    color: var(--text);
    padding: 0;
    margin: -0.6rem 0 0 0;
    border-radius: 100%;
    border-width: 1px;
    border-style: solid;
    height: 3.5rem;
    width: 3.5rem;
  }
}
</style>