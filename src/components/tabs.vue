<script setup>
  //On importe storeToRefs pour écouter les changements
  import { storeToRefs } from "pinia";

  import { useTabsStore } from "@/store/tabs";
  const tabsStore = useTabsStore();

  import { usePlayersStore } from "@/store/players";
  
  //Sert à détecter les changements du store playersStore défini au-dessus
  const { playersSelected } = storeToRefs(usePlayersStore());
</script>

<template>
  <div class="tabs">
    <button class="btn btn-icon players-title" 
            :class="{ 'selected' : tabsStore.currentTab === 'players'}" 
            @click="tabsStore.tabSelect('players')">
      {{ tabsStore.texts.nbr_joueurs_select }} 
      <span v-if="playersSelected.length" class="badge">{{ playersSelected.length }}</span>
    </button>

    <button class="btn btn-icon" 
            :class="{ 'selected' : tabsStore.currentTab === 'matchsHome'}"
            @click="tabsStore.tabSelect('matchsHome')">
      Matchs
    </button>
  </div>
</template>

<style lang="scss">
#app {
  .tabs {
    position: fixed;
    top: 0;
    display: flex;
    padding-top: 1rem;
    justify-content: left;
    border-bottom: 1px solid $c-grey;
    background-color: $c-white;
    width: 100%;

    .btn {
      font-size: 2rem;
      font-weight: 700;
      padding: 1rem 2rem;

      &.selected {
        border-bottom: 2px solid $c-modal-btn;
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
        background-color: $c-modal-btn;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        color: $c-white;
        border-radius: 50%;
      }
    }
  }
}
</style>
