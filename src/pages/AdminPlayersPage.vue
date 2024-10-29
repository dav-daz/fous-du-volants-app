<script setup>
import { onMounted, watch  } from 'vue';
import FormAddPlayer from '@/components/FormAddPlayer.vue';

import { useSupabasePlayerStore } from '@/store/SupabasePlayerStore.js';
const store = useSupabasePlayerStore();

onMounted(async () => {
  await store.fetchPlayers({ invite: false });
});

function confirmDeletePlayer(prenom, id) {
  if (confirm(`Êtes-vous sûr de vouloir supprimer le joueur "${prenom}" ?`)) {
    store.removePlayer(id);
  }
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
      <li v-for="player in store.getAllPlayers" :key="player.id" class="players-list">
        {{ player.prenom }}

        <div class="players-list-actions">
          <button class="btn-icon btn-delete" 
                  type="button" @click="confirmDeletePlayer(player.prenom, player.id)">
            <fa-icon icon="trash" />
          </button>

          <button class="btn-icon btn-edit" 
              type="button">
            <fa-icon icon="pen" />
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