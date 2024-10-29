<script setup>
import { ref } from "vue";

import { useSupabasePlayerStore } from '@/store/SupabasePlayerStore.js';
const store = useSupabasePlayerStore();

let prenom = ref("");

async function addPlayer() {
  if (prenom.value) {
    const newPlayer = [{ prenom: prenom.value }];

    /*
    Si plusieurs champs :
    const newPlayer = { prenom: prenom.value, nom: nom.value };
    */

    await store.addPlayer(newPlayer);
    await store.fetchPlayers({ invite: false }); // Rafraîchir la liste des joueurs

    prenom.value = "";
  } else {
    alert("Veuillez renseigner le nom.");
  }
}

</script>

<template>
<h2>Ajouter un joueur</h2>
<form class="form-add-player" @submit.prevent="addPlayer">
  <div class="form-content">
    <div class="form-item">
      <label for="prenom">Prénom: </label>
      <input type="text" id="prenom" v-model="prenom">
    </div>

    <div class="form-actions">
      <button class="modal-btn" type="submit">Ajouter</button>
    </div>
  </div>
</form>
</template>

<style lang="scss" scoped>
.form-add-player {
  label {
    display: block;
  }

  .form-content {
    display: flex;
    align-items: flex-end;
    gap: 2rem;
    justify-content: space-between;
  }

  .form-actions {
    text-align: right;
    margin-top: 3rem;
  }
}
</style>
