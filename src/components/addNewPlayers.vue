<script setup>
  import content from '@/data/content.json';

  import { reactive } from "vue";
  import { useToolsStore } from "@/store/tools.js";
  const toolsStore = useToolsStore();

  import { usePlayersStore } from "@/store/players.js";
  const playersStore = usePlayersStore();

  const texts = toolsStore.texts;

  const newPlayersTemp = reactive([
        {
          id: Date.now(),
          nom: ''
        }
      ]);

  function closeModal() {
    toolsStore.showModal = false;
  }

  function addField(player) {
    newPlayersTemp.push({
      id: Date.now(),
      nom: player.nom
    });
  }

  function removeField(index) {
    newPlayersTemp.splice(index, 1);
  }

</script>

<template>
  <h3 class="modal-title">{{ content.add_new_player.title }}</h3>

    <div
        v-for="(newPlayer, k) in newPlayersTemp"
        :key="k"
        class="add-player-input"
    >
      <input v-model="newPlayer.nom" type="text" placeholder="Nom du joueur"/>
      <!-- Remove botton -->
      <button v-show="newPlayersTemp.length > 1" 
              @click="removeField(k)" 
              type="button" 
              class="btn-icon btn-remove"><fa-icon icon="square-minus" />
      </button>

      <!-- Add button -->
      <button v-show="(k == newPlayersTemp.length-1)&&(newPlayer.nom != '')" 
              @click="addField(newPlayer.nom)"
              type="button" 
              class="btn-icon btn-add"><fa-icon icon="square-plus" />
      </button>
    </div>

    <div class="modal-footer">
      <button
          class="modal-btn"
          @click="closeModal"
          v-html="content.button.modal_close">
      </button>
      
      <button 
            v-if="newPlayersTemp[0].nom != ''"
            @click="playersStore.addNewPlayers(newPlayersTemp)"
            class="modal-btn"
            type="button"
            v-html="content.button.add_to_list">
      </button>
    </div>
</template>

<style lang="scss">
  .add-player-input {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    margin-bottom: 1.5rem;

    input[type=text] {
      width: 18rem;
    }

    .svg-inline--fa {
      font-size: 3rem;
    }

    .btn-add {
      color: var(--green);
    }

    .btn-remove {
      color: var(--red);
    }
  }
</style>