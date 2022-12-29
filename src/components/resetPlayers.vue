<template>
  <h3>Initialiser ?</h3>
  <button
      class="modal-default-button reset"
      @click="$emit('reset')"
      v-html="texts.button.init_confirm"
  ></button>
</template>

<script>
import content from './../data/content.json';

export default {
  name: "resetPlayers.vue",

  data() {
    return {
      texts: {
        button: {
          init_confirm: content.button.init_confirm
        }
      },
    }
  }
}
</script>

<style>

</style>