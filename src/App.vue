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
  <button class="btn btn-icon players-title" @click="currentTab = 'players'">{{ texts.nbr_joueurs_select }} <span class="badge" v-if="nbrSelectedPlayers">{{ nbrSelectedPlayers }}</span></button>
  <button class="btn btn-icon" @click="currentTab = 'matchsHome'">Matchs</button>
</div>

<div class="main-content">
  <component :is="currentTab" @total-selected-players="totalSelectedPlayers"></component>
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
      nbrSelectedPlayers: '',
      currentTab: 'players'
    }
  },
  mounted() {
    if (localStorage.getItem('playersSelected')) {
      try {
        this.playersSelected = JSON.parse(localStorage.getItem('playersSelected'));
      } catch(e) {
        localStorage.removeItem('playersSelected');
      }
    }

    if (localStorage.getItem('registeredPersons')) {
      try {
        this.registeredPersons = JSON.parse(localStorage.getItem('registeredPersons'));
      } catch(e) {
        localStorage.removeItem('registeredPersons');
      }
    }

    if (localStorage.getItem('newPlayers')) {
      try {
        this.newPlayers = JSON.parse(localStorage.getItem('newPlayers'));
      } catch(e) {
        localStorage.removeItem('newPlayers');
      }
    }

    if (this.playersSelected.length) {
      this.nbrSelectedPlayers = this.playersSelected.length;
    }
  },
  methods:{
    saveInLocal() {
      const parsedSelected = JSON.stringify(this.playersSelected);
      localStorage.setItem('playersSelected', parsedSelected);

      const parsedRegistered = JSON.stringify(this.registeredPersons);
      localStorage.setItem('registeredPersons', parsedRegistered);

      const parsedNewPlayers = JSON.stringify(this.newPlayers);
      localStorage.setItem('newPlayers', parsedNewPlayers);
    },
    totalSelectedPlayers (s) {
      this.nbrSelectedPlayers = s;
    }
  }

}
</script>

<style lang="scss">
#app {
  .tabs {
    display: flex;
    justify-content: space-between;
    padding: 2rem;
    border-bottom: 1px solid $c-grey;

    .btn {
      font-size: 2rem;
      font-weight: 700;
    }
  }

  .main-content {
    margin-top: 3rem;
  }

  .players-title {
    position: relative;
    display: inline-block;

    .badge {
      position: absolute;
      top: -0.8rem;
      right: -2.5rem;
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
