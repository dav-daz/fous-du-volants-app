<template>
  <h3 class="modal-title">Initialiser ?</h3>

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