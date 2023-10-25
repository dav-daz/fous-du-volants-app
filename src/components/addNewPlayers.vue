<script setup>
  import { useToolsStore } from "@/store/tools";
  const toolsStore = useToolsStore();

  import { usePlayersStore } from "@/store/players";
  const playersStore = usePlayersStore();

  const texts = toolsStore.texts;

  function closeModal() {
    toolsStore.showModal = false;
  }

  function addField(player) {
    playersStore.newPlayers.push({
      nom: player.nom
    });
  }

  function removeField(index) {
    playersStore.newPlayers.splice(index, 1);
  }
    
  function sendNewPlayers() {
    //this.$emit('addNewPlayers', this.newPlayers);

    playersStore.newPlayers = [{ nom :'' }];
  }
</script>

<template>
  <h3 class="modal-title">Ajouter des nouveaux joueurs</h3>

    <div
        v-for="(newPlayer, k) in playersStore.newPlayers"
        :key="k"
        class="add-player-input"
    >
      <input v-model="newPlayer.nom" type="text" placeholder="Nom du joueur"/>
      <!-- Remove botton -->
      <button v-show="k || ( !k && playersStore.newPlayers.length > 1)" 
              @click="removeField(k)" 
              type="button" 
              class="btn-icon btn-remove"><fa-icon icon="square-minus" />
      </button>

      <!-- Add button -->
      <button v-show="(k == playersStore.newPlayers.length-1)&&(newPlayer.nom != '')" 
              @click="addField(newPlayer.nom)"
              type="button" 
              class="btn-icon btn-add"><fa-icon icon="square-plus" />
      </button>
    </div>

    <div class="modal-footer">
      <button
          class="btn-modal"
          @click="closeModal"
          v-html="texts.button.modal_close">
      </button>
      
      <button @click="playersStore.addNewPlayers(playersStore.newPlayers)"
              class="btn-modal"
              type="button"
              v-html="texts.button.add_to_list">
      </button>
    </div>
</template>

<style lang="scss">
  .add-player-input {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    margin-bottom: 1.5rem;

    .svg-inline--fa {
      font-size: 3rem;
    }

    .btn-add {
      color: $c-green;
    }

    .btn-remove {
      color: $c-red;
    }
  }
</style>