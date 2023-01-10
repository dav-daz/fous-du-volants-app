<template>
  <h3 class="modal-title">Ajouter des nouveaux joueurs</h3>

    <div
        v-for="(newPlayer, k) in newPlayers"
        :key="k"
        class="add-player-input"
    >
      <input v-model="newPlayer.nom" type="text" placeholder="Nom du joueur"/>
      <!-- Remove botton -->
      <button v-show="k || ( !k && newPlayers.length > 1)" @click="removeField(k)" type="button" class="btn-icon btn-remove"><fa-icon icon="square-minus" /></button>

      <!-- Add button -->
      <button @click="addField(newPlayer.nom)" v-show="(k == newPlayers.length-1)&&(newPlayer.nom != '')" type="button" class="btn-icon btn-add"><fa-icon icon="square-plus" /></button>
    </div>
    <div class="modal-footer">
      <button
          class="btn-modal"
          @click="$emit('close')"
          v-html="texts.button.modal_close"></button>
      <button @click="sendNewPlayers"
              class="btn-modal"
              type="button"
              v-html="texts.button.add_to_list"></button>
    </div>

</template>

<script>
import content from './../data/content.json';

export default {
  name: "addNewPlayers.vue",
  data() {
    return {
      texts: {
        "title": content.add_new_player.title,
        button: {
          add_to_list: content.button.add_to_list,
          modal_close: content.button.modal_close
        }
      },
      newPlayers: [
        { nom :'' }
      ],
    }
  },
  methods: {
    addField(player) {
      this.newPlayers.push({
        nom: player.nom
      });
    },
    removeField(index) {
      this.newPlayers.splice(index, 1);
    },
    sendNewPlayers() {
      this.$emit('addNewPlayers', this.newPlayers);

      this.newPlayers = [{ nom :'' }];
    }
  }
}
</script>

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