<script setup>
  import { useToolsStore } from "@/store/tools";
  const toolsStore = useToolsStore();
  const texts = toolsStore.texts;

  function closeModal() {
    toolsStore.showModal = false;
  }
</script>

<template>
  <h3 class="modal-title" v-html="texts.resetPlayersTitle"></h3>

  <p class="modal-text" v-html="texts.resetPlayersText"></p>

  <div class="modal-footer">
    <button
        class="btn-modal"
        @click="closeModal"
        v-html="texts.button.modal_close">
    </button>
    
    <button
        class="btn-modal"
        @click="$emit('reset')"
        v-html="texts.button.init_confirm">
    </button>
  </div>
</template>

<style>

</style>