<script setup>
import { onMounted, nextTick, ref  } from 'vue';
import FormAddPlayer from '@/components/FormAddPlayer.vue';

import { useSupabasePlayerStore } from '@/store/SupabasePlayerStore.js';
const store = useSupabasePlayerStore();

const isDisabled = ref([]);
const inputs = ref([]);

onMounted(async () => {
  isDisabled.value = new Array(store.getPlayersNotInvited.length).fill(true);
});

function confirmDeletePlayer(prenom, id) {
  if (confirm(`Êtes-vous sûr de vouloir supprimer le joueur "${prenom}" ?`)) {
    store.removePlayer(id);
  }
}

function toggleDisable(index) {
  isDisabled.value[index] =!isDisabled.value[index];
  if (!isDisabled.value[index]) {
    nextTick(() => {
      inputs.value[index].focus();
    });
  }
}

function update(id, data, index) {
  store.editPlayer(id, data, null, null);
  toggleDisable(index);
}
</script>

<template>
  <div class="content-page">
    <h1>Gestion des joueurs</h1>

    <div class="add-player">
      <FormAddPlayer />  
    </div>
    
    <h2>Liste des joueurs</h2>
    <ul>
      <li v-for="(player, index) in store.getPlayersNotInvited" :key="player.id" class="players-list">
        <input :disabled="isDisabled[index]" 
                v-model="player.prenom" 
                :ref="(el) => { if (el) inputs[index] = el; }"
                type="text" />
        

        <div class="players-list-actions">
          <button v-if="isDisabled[index]" class="btn-icon btn-edit" 
                  type="button"
                  @click="toggleDisable(index)">
            <fa-icon icon="pen" />
          </button>

          <button v-else class="btn-icon btn-valid" 
                  type="button" 
                  @click="update(player.id, {prenom: player.prenom}, index)">
            <fa-icon icon="check" />
          </button>

          <button class="btn-icon btn-delete" 
                  type="button" 
                  @click="confirmDeletePlayer(player.prenom, player.id)">
            <fa-icon icon="trash" />
          </button>
        </div>
        
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.add-player {
  margin: 3rem 0;
}

.players-list {
  margin: 2.5rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  font-size: 1.85rem;

  &-actions {
    display: flex;
    gap: 2rem;
  }
}
</style>