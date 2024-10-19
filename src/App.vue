<script setup>
  import menuMain from "@/components/menuMain.vue";
  import tabs from "@/components/tabs.vue";
  import players from "@/components/players.vue";
  import matchsHome from "@/components/matchsHome.vue";

  import { useTabsStore } from "@/store/tabs.js";
  
  //On importe storeToRefs pour écouter les changements
  import { storeToRefs } from "pinia";

  const tabsStore = useTabsStore();

  //Sert à détecter les changements du store tabStore défini au-dessus
  const { currentTab } = storeToRefs(tabsStore);
</script>

<template>
  <menuMain />
  <tabs />

  <div class="main-content">
    <players v-if="currentTab === 'players'" />
    <matchsHome v-if="currentTab === 'matchsHome'" />
  </div>
</template>

<style lang="scss">
#app {
  .main-content {
    margin: 9rem 0 4rem 0;
    padding: 0 1rem;
  }
}
</style>
