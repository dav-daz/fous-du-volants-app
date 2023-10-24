<script setup>
import { useToolsStore } from "@/store/tools";
const toolsStore = useToolsStore();

import modal from "@/components/Modal";
import addNewPlayers  from '@/components/addNewPlayers';
import resetPlayers from "@/components/resetPlayers";
</script>

<template>
  <div class="tools">
    <button class="btn-icon btn-init" 
            @click="toolsStore.loadModal('resetPlayers')" 
            type="button">
      <fa-icon icon="trash" />
    </button>

    <button class="btn-icon btn-add-players" 
            @click="toolsStore.loadModal('addNewPlayers')" 
            type="button">
      <fa-icon icon="plus" />
    </button>
  </div>

  <!-- use the modal component, pass in the prop -->
  <modal :show="toolsStore.showModal">
    <template #body>
      <!--
      On change de composant, grâce à <component> et :is
      Comme si on écrivait : <addNewPlayers @add-new-players="addNewPlayers" /> ou <addNewPlayers @reset="reset" />
      On récup aussi les $emit des composants

      @add-new-players | @reset : $emit from 'resetPlayers.vue'
      -->
      <!--
      <component :is="componentInModal" 
                  @add-new-players="addNewPlayers" 
                  @close="showModal = false" 
                  @reset="reset" />
    -->

    <addNewPlayers v-if="toolsStore.componentInModal === 'addNewPlayers'" />
    <resetPlayers v-if="toolsStore.componentInModal === 'resetPlayers'" />
    </template>
  </modal>
</template>

<style lang="scss">
#app {
  .tools {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1.5rem;
    margin-bottom: 4rem;

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
}
</style>
