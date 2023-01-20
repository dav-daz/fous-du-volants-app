<template>
  <!--
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
  -->

  <p class="players-title">{{ texts.nbr_joueurs_select }} <span class="badge" v-if="nbrSelectedPlayers">{{ nbrSelectedPlayers }}</span></p>

  <players @total-selected-players="totalSelectedPlayers" ></players>


</template>

<script>
import content from '@/data/content.json';
import players from "@/components/players";

export default {
  name: 'App',
  components: {
    players
  },
  data() {
    return {
      texts: {
        nbr_joueurs_select: content.home.nbr_joueurs_select,
      },
      playersSelected: [],
      registeredPersons : content.registeredPersons,
      newPlayers: [],
      nbrSelectedPlayers:''
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
  .players-title {
    position: relative;
    display: inline-block;
    font-size: 2rem;
    font-weight: 700;

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
