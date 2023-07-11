<template>
  <!--
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
  -->

  <!--
  <players @total-selected-players="totalSelectedPlayers" ></players>
  <matchsHome></matchsHome>
  -->
<div class="tabs">
  <button class="btn btn-icon players-title" 
          :class="{ 'selected' : currentTab === 'players'}" 
          @click="tabSelect('players')">
    {{ texts.nbr_joueurs_select }} 
    <span class="badge" v-if="playersSelected.length">{{ playersSelected.length }}</span>
  </button>

  <button class="btn btn-icon" 
          :class="{ 'selected' : currentTab === 'matchsHome'}" 
          @click="tabSelect('matchsHome')">
    Matchs
  </button>
</div>

<div class="main-content">
  <!--
  :playersSelected | :registeredPersons : props for get array to 'players.vue'
  @reset-player-selected : $emit from 'players.vue' component
  -->
  <component :is="currentTab" 
              :playersSelected="playersSelected"
              :registeredPersons="registeredPersons"
              @reset-player-selected="this.playersSelected = []"/>
</div>

</template>

<script>
import content from '@/data/content.json';
import players from "@/components/players";
import matchsHome from "@/components/matchsHome";

export default {
  name: 'App',
  components: {
    players,
    matchsHome
  },
  data() {
    return {
      texts: {
        nbr_joueurs_select: content.home.nbr_joueurs_select,
      },
      playersSelected: [],
      registeredPersons : content.registeredPersons,
      newPlayers: [],
      currentTab: 'players'
    }
  },
  mounted() {
    if (localStorage.getItem('localPlayersSelected')) {
      try {
        this.playersSelected = JSON.parse(localStorage.getItem('localPlayersSelected'));
      } catch(e) {
        localStorage.removeItem('localPlayersSelected');
      }
    }

    if (localStorage.getItem('localRegisteredPersons')) {
      try {
        this.registeredPersons = JSON.parse(localStorage.getItem('localRegisteredPersons'));
      } catch(e) {
        localStorage.removeItem('localRegisteredPersons');
      }
    }

    if (localStorage.getItem('localNewPlayers')) {
      try {
        this.newPlayers = JSON.parse(localStorage.getItem('localNewPlayers'));
      } catch(e) {
        localStorage.removeItem('localNewPlayers');
      }
    }
  },
  methods:{
    tabSelect(tabName) {
      this.currentTab = tabName;
    }
  }
}
</script>

<style lang="scss">
#app {
  .tabs {
    position: fixed;
    top: 0;
    display: flex;
    padding-top: 1rem;
    justify-content: space-between;
    border-bottom: 1px solid $c-grey;
    background-color: $c-white;

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
    margin-top: 7rem;
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
