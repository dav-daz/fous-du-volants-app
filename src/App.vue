<script setup>
  import menuMain from "@/components/menuMain.vue";
</script>

<template>
  <menuMain />

  <RouterView />
</template>

<style lang="scss">
#app {
  .main-content {
    margin: 9rem 0 4rem 0;
    padding: 0 1rem;
  }
}
</style>
