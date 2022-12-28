<template>
  <!--
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
  -->

  <div class="tools">
    <button class="btn-init" @click="loadModal('resetPlayers')" type="button">Initialiser</button>
    <p>Nombre de joueurs sélectionnés: {{ playersSelected.length }}</p>
    <button class="btn-add" @click="loadModal('addNewPlayers')" type="button">Ajouter des joueurs</button>
  </div>

  <div class="all-persons-list">
    <ul>
      <li v-for="player in registeredPersons"
          :key="player.id"
          v-bind:class="{selected: playersSelected.find(el => el.id == player.id)}"
          class="all-persons-list-item"
      >
        <div class="all-persons-list-buttons">
          <button @click="addPlayer(player)" class="button-add" type="button">ajouter</button>
          <p class="all-persons-list-name">{{ player.nom }}</p>
          <button @click="deletePlayer(player)" class="button-delete" type="button">retirer</button>
        </div>
      </li>
    </ul>
  </div>


  <!-- use the modal component, pass in the prop -->
  <modal :show="showModal" @close="showModal = false">
    <template #body>
      <!--
      On change de composant, grâce à <component> et :is
      Comme si on écrivait : <addNewPlayers @add-new-players="addNewPlayers" /> ou <resetPlayers @reset="reset" />
      On récup aussi les $emit des composants
      -->
      <component :is="componentInModal" @add-new-players="addNewPlayers" @reset="reset" />
    </template>
  </modal>

</template>

<script>
import Modal from './components/Modal.vue';
import addNewPlayers  from './components/addNewPlayers';
import resetPlayers from "@/components/resetPlayers";

export default {
  name: 'App',
  components: {
    Modal,
    addNewPlayers,
    resetPlayers
  },
  data() {
    return {
      showModal: false,
      componentInModal: '',
      playersSelected: [],
      registeredPersons : [
        { id : 1, nom :'Alex', equipe: [], adv : [] },
        { id : 2, nom :'Armel', equipe: [], adv : [] },
        { id : 3, nom :'Arnault', equipe: [], adv : [] },
        { id : 4, nom :'Bertrand',  equipe: [], adv : [] },
        { id : 5, nom :'Bruno', equipe: [], adv : [] },
        { id : 6, nom :'David', equipe: [], adv : [] },
        { id : 7, nom :'Didier', equipe: [], adv : [] },
        { id : 8, nom :'Dimitri', equipe: [], adv : [] },
        { id : 9, nom :'Elodie', equipe: [], adv : [] }
      ],
      newPlayers: []
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
  computed:{

  },

  methods:{
    displayModal () {
      this.showModal = true;
    },

    loadModal (componentToLoad) {
      this.componentInModal = componentToLoad;
      this.displayModal();
    },

    addPlayer (player) {
      // on regarde si le joueur est déjà dans le tableau
      let found = this.playersSelected.find(el => el.id == player.id);

      if(!found) {
        this.playersSelected.push({
          id: player.id,
          nom: player.nom
        });
      }

      this.saveInLocal();
    },

    deletePlayer (player) {
      // retrouve l'index de mon object "player"
      const indexPlayer = this.playersSelected.map(i => i.id).indexOf(player.id);

      if(indexPlayer > -1) {
        // si on retrouve, on supprime du tableau
        this.playersSelected.splice(indexPlayer, 1);
      }

      this.saveInLocal();
    },

    addNewPlayers(players) {
      for (var i = 0, length = players.length; i < length; i++) {
        let playerName = players[i].nom;

        if (playerName) {
          // on prend le timestamp pour générer un id unique
          let numberId = Date.now();

          this.registeredPersons.push({
            id: numberId,
            nom: playerName
          });

          this.playersSelected.push({
            id: numberId,
            nom: playerName
          });

          this.newPlayers.push({
            id: numberId
          });
        }

        this.saveInLocal();
        this.showModal = false;
      }
    },

    saveInLocal() {
      const parsedSelected = JSON.stringify(this.playersSelected);
      localStorage.setItem('playersSelected', parsedSelected);

      const parsedRegistered = JSON.stringify(this.registeredPersons);
      localStorage.setItem('registeredPersons', parsedRegistered);

      const parsedNewPlayers = JSON.stringify(this.newPlayers);
      localStorage.setItem('newPlayers', parsedNewPlayers);
    },

    deleteNewPlayers() {
      // on parcours le tableau 'newPlayers' pour prendre les id
      for (var j = 0, length = this.newPlayers.length; j < length; j++) {
        let idNewPlayer = this.newPlayers[j].id;

        // retrouve l'index de "idNewPlayer" dans le tableau 'registeredPersons'
        const indexPlayer = this.registeredPersons.map(i => i.id).indexOf(idNewPlayer);

        if(indexPlayer > -1) {
          // si on retrouve, on supprime du tableau
          this.registeredPersons.splice(indexPlayer, 1);
        }
      }

      this.newPlayers = [];
    },

    reset() {
      this.playersSelected = [];
      this.deleteNewPlayers();

      localStorage.removeItem('playersSelected');
      localStorage.removeItem('registeredPersons');
      localStorage.removeItem('newPlayers');

      this.showModal = false;
    }
  }

}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;

  ul,
  li {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .tools {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 15px;
  }

  .all-persons-list {
    text-align: center;

    &-item {
      background-color: red;
      margin-bottom: 10px;
      color: #fff;
      font-weight: 700;
      padding: 5px;

      &.selected {
        background-color: green;
      }
    }

    &-buttons {
      display: flex;
      justify-content: space-between;
      gap: 30px;
    }
  }

  .btn-init {
    color: red;
    border: 1px solid red;
  }
}

</style>
