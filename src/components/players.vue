<template>
  <div class="tools">
    <button class="btn-icon btn-init" 
            @click="loadModal('resetPlayers')" 
            type="button">
      <fa-icon icon="trash" />
    </button>

    <button class="btn-icon btn-add-players" 
            @click="loadModal('addNewPlayers')" 
            type="button">
      <fa-icon icon="plus" />
    </button>
  </div>

  <div class="all-persons-list">
    <ul>
      <li v-for="player in registeredPersons"
          :key="player.id"
          class="all-persons-list-item">

        <div v-bind:class="{selected: playersSelected.find(el => el.id == player.id)}" class="person-card">
          <p class="person-card-name">{{ player.nom }}</p>
          <div class="person-card-buttons">
            <button @click="addPlayer(player)" 
                    class="person-card-buttons-button add btn-icon" 
                    type="button">
              <fa-icon icon="user-plus" size="2x" />
            </button>

            <button @click="deletePlayer(player)" 
                    class="person-card-buttons-button delete btn-icon" 
                    type="button">
              <fa-icon icon="user-minus" size="2x" />
            </button>
          </div>
        </div>

      </li>
    </ul>
  </div>


  <!-- use the modal component, pass in the prop -->
  <modal :show="showModal">
    <template #body>
      <!--
      On change de composant, grâce à <component> et :is
      Comme si on écrivait : <addNewPlayers @add-new-players="addNewPlayers" /> ou <resetPlayers @reset="reset" />
      On récup aussi les $emit des composants

      @add-new-players | @reset : $emit from 'resetPlayers.vue'
      -->
      <component :is="componentInModal" 
                  @add-new-players="addNewPlayers" 
                  @close="showModal = false" 
                  @reset="reset" />
    </template>
  </modal>
</template>

<script>
import content from "@/data/content.json";
import Modal from '@/components/Modal.vue';
import addNewPlayers  from '@/components/addNewPlayers';
import resetPlayers from "@/components/resetPlayers";

export default {
  name: "players.vue",
  props: ['playersSelected','registeredPersons'],
  components: {
    Modal,
    addNewPlayers,
    resetPlayers,
  },
  data() {
    return {
      texts: {
        nbr_joueurs_select: content.home.nbr_joueurs_select,
        button: {
          add_player: content.button.add_player,
          delete_player: content.button.delete_player,
          add_news_players: content.button.add_news_players,
          initialiser: content.button.initialiser
        }
      },
      showModal: false,
      componentInModal: '',
      //playersSelected: [],
      //registeredPersons : content.registeredPersons,
      newPlayers: [],
    }
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
      localStorage.setItem('localPlayersSelected', parsedSelected);

      const parsedRegistered = JSON.stringify(this.registeredPersons);
      localStorage.setItem('localRegisteredPersons', parsedRegistered);

      const parsedNewPlayers = JSON.stringify(this.newPlayers);
      localStorage.setItem('localNewPlayers', parsedNewPlayers);
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
      this.$emit('reset-player-selected');
      this.deleteNewPlayers();

      localStorage.removeItem('localPlayersSelected');
      localStorage.removeItem('localRegisteredPersons');
      localStorage.removeItem('localNewPlayers');

      this.showModal = false;
    }
  }
}
</script>

<style lang="scss">
#app {
  .tools {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1.5rem;
    margin-bottom: 4rem;
  }

  .all-persons-list {
    &-item {
      margin-bottom: 1.5rem;
      list-style: none;
    }
  }

  .person-card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 3rem;
    padding: 1.6rem;
    background-color: $c-blue-light;
    border-radius: $border-radius-4;
    transition: all ease-in-out 0.3s;

    &-name {
      font-size: 1.8rem;
      font-weight: 700;
    }

    &-buttons {
      &-button {
        &.delete {
          display: none;
        }
      }
    }

    &.selected {
      background-color: $c-green;
      //box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);

      .add {
        display: none;
      }

      .delete {
        display: inline-block;
      }
    }
  }

  .btn-init {
    color: $c-white;
    background-color: $c-red;
    height: 3.5rem;
    width: 3.5rem;
    border-radius: 50%;

    .fa-trash {
      font-size: 2rem;
    }
  }

  .btn-add-players {
    color: $c-white;
    background-color: $c-modal-btn;
    height: 3.5rem;
    width: 3.5rem;
    border-radius: 50%;

    .fa-plus {
      font-size: 2.5rem;
    }
  }
}
</style>