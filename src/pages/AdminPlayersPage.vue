<script setup>
import { ref } from 'vue';

import { supabase } from '@/lib/supabaseClient';

const Joueurs = ref([]);

const getJoueurs = async () => {
  try {
    const { data, error } = await supabase
     .from('Joueurs')
     .select('*')
     .order('nom', { ascending: true });

    if (error) {
      console.log(error);
    } else {
      Joueurs.value = data;
    }
  } catch (error) {
    console.log(error);
  }
};

getJoueurs();
</script>

<template>
  <div class="content-page">
    <h1>Gestion des joueurs</h1>

    <ul>
      <li v-for="player in Joueurs" :key="player.id" class="players-list">
        {{ player.nom }}

        <div class="players-list-actions">
          <button class="btn-icon btn-delete" 
                  type="button">
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