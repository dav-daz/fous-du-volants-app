<script setup>
import { ref } from "vue";



let prenom = ref("");
</script>

<template>
<h2>Ajouter un joueur</h2>
<form class="form-add-player">
  <div class="form-content">
    <div class="form-item">
      <label for="email">Prénom: </label>
      <input type="text" id="prenom" v-model="prenom">
    </div>

    <div class="form-actions">
      <button class="modal-btn" type="button" @click="">Ajouter</button>
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
