<script setup>
  import players from "@/components/players";
  import matchsHome from "@/components/matchsHome";

  import { usePlayersStore } from "@/store/players";
  const playersStore = usePlayersStore();
</script>

<template>
  <div class="tabs">
    <button class="btn btn-icon players-title" 
            :class="{ 'selected' : playersStore.currentTab === 'players'}" 
            @click="playersStore.tabSelect('players')">
      {{ playersStore.texts.nbr_joueurs_select }} 
      <span class="badge">{{ totalSelected }}</span>
    </button>

    <button class="btn btn-icon" 
            :class="{ 'selected' : playersStore.currentTab === 'matchsHome'}"
            @click="playersStore.tabSelect('matchsHome')">
      Matchs
    </button>
  </div>

  <div class="main-content">
    <players v-if="playersStore.currentTab === 'players'" />
    <matchsHome v-if="playersStore.currentTab === 'matchsHome'" />

    <!--
    :playersSelected | :registeredPersons : props for get array to 'players.vue'
    @reset-player-selected : $emit from 'players.vue' component
    -->

    <!--
    <component :is="tab" 
                @reset-player-selected="this.playersSelected = []"
    />
    -->
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
  }

  .main-content {
    margin-top: 9rem;
    padding: 0 1rem;
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
</style>
