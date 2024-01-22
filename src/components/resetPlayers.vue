<script setup>
  import content from '@/data/content.json';

  import { useToolsStore } from "@/store/tools";
  const toolsStore = useToolsStore();

  import { usePlayersStore } from "@/store/players";
  const playersStore = usePlayersStore();
  
  const texts = toolsStore.texts;

  function closeModal() {
    toolsStore.showModal = false;
  }
</script>

<template>
  <h3 class="modal-title" v-html="content.reset_players.title"></h3>

  <p class="modal-text" v-html="content.reset_players.text"></p>

  <div class="modal-footer">
    <button
        class="btn-modal"
        @click="closeModal"
        v-html="content.button.modal_close">
    </button>
    
    <button
        class="btn-modal"
        @click="playersStore.reset()"
        v-html="content.button.init_confirm">
    </button>
  </div>
</template>

<style>

</style>