<script setup>
  import content from '@/data/content.json';

  //On importe storeToRefs pour écouter les changements
  //import { storeToRefs } from "pinia";

  import { useTabsStore } from "@/store/tabs.js";
  const tabsStore = useTabsStore();

  //import { usePlayersStore } from "@/store/players.js";


  import { useSupabasePlayerStore } from '@/store/SupabasePlayerStore.js';
  const store = useSupabasePlayerStore();
  
  //Sert à détecter les changements du store playersStore défini au-dessus
  //const { playersSelected } = storeToRefs(usePlayersStore());
</script>

<template>
  <div class="tabs">
    <div class="tabs-col-left">
      <button class="btn btn-icon players-title" 
            :class="{ 'selected' : tabsStore.currentTab === 'players'}" 
            @click="tabsStore.tabSelect('players')">
      {{ content.tabs.players }}
      <span v-if="store.players.length" class="badge">{{ store.players.length }}</span>
    </button>

    <button class="btn btn-icon" 
            :class="{ 'selected' : tabsStore.currentTab === 'matchsHome'}"
            @click="tabsStore.tabSelect('matchsHome')">
      {{ content.tabs.matchs }}
    </button>
    </div>

    <div class="tabs-col-right">
      
    </div>
  </div>
</template>

<style lang="scss">
#app {
  .tabs {
    position: fixed;
    top: 0;
    display: flex;
    padding-top: 1rem;
    justify-content: space-between;
    align-items: center;
    gap: 3rem;
    border-bottom: 1px solid var(--tabs-border);
    background-color: var(--tabs-background);
    width: 100%;

    &-col-right {
      margin-right: 3rem;
    }

    .btn {
      font-size: 2rem;
      font-weight: 700;
      padding: 1rem 2rem;
      color: var(--text);

      &.selected {
        border-bottom: 2px solid var(--violet);
      }
    }

    .players-title {
      position: relative;
      display: inline-block;

      .badge {
        position: absolute;
        top: -0.3rem;
        right: 0;
        font-size: 1.2rem;
        font-weight: 700;
        height: 2rem;
        width: 2rem;
        background-color: var(--violet);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        color: var(--white);
        border-radius: 50%;
      }
    }
  }
}
</style>
