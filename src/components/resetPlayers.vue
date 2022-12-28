<template>
  <h3>Initialiser ?</h3>
  <button
      class="modal-default-button reset"
      @click="$emit('reset')"
  >Oui</button>
</template>

<script>
export default {
  name: "resetPlayers.vue"
}
</script>

<style>

</style>