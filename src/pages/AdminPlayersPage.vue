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
      <li v-for="player in Joueurs" :key="player.id" class="all-persons-list-item">
        {{ player.nom }}
        <button class="btn-icon btn-init" 
            type="button">
          <fa-icon icon="trash" />
        </button>

        <button class="btn-icon btn-init" 
            type="button">
          <fa-icon icon="pen" />
        </button>
      </li>
    </ul>
  </div>
</template>