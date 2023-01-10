<template>
  <h3 class="modal-title" v-html="texts.reset_players.title"></h3>

  <p class="modal-text" v-html="texts.reset_players.text"></p>

  <div class="modal-footer">
    <button
        class="btn-modal"
        @click="$emit('close')"
        v-html="texts.button.modal_close"></button>
    <button
        class="btn-modal"
        @click="$emit('reset')"
        v-html="texts.button.init_confirm"></button>
  </div>
</template>

<script>
import content from './../data/content.json';

export default {
  name: "resetPlayers.vue",

  data() {
    return {
      texts: {
        reset_players: {
          title: content.reset_players.title,
          text: content.reset_players.text
        },
        button: {
          init_confirm: content.button.init_confirm,
          modal_close: content.button.modal_close
        }
      },
    }
  }
}
</script>

<style>

</style>