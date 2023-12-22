<script setup>
  import tabs from "@/components/tabs";
  import players from "@/components/players";
  import matchsHome from "@/components/matchsHome";

  import { useTabsStore } from "@/store/tabs";
  
  //On importe storeToRefs pour écouter les changements
  import { storeToRefs } from "pinia";

  const tabsStore = useTabsStore();

  //Sert à détecter les changements du store tabStore défini au-dessus
  const { currentTab } = storeToRefs(tabsStore);
</script>

<template>
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
