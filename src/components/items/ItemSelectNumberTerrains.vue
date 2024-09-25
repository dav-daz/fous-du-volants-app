<script setup>
import { ref, watch } from 'vue';

import { useMatchsStore } from "@/store/matchs";
import { storeToRefs } from 'pinia';

const matchsStore = useMatchsStore();
const { maxTerrains } = storeToRefs(matchsStore);

const terrainsNumber = ref(maxTerrains.value);

// Utiliser un watcher pour mettre à jour le store chaque fois que terrainsNumber change
watch(terrainsNumber, (newValue) => {
  matchsStore.setMaxTerrains(newValue);
});
</script>

<template>
  <label for="terrainsNumber">nombre de terrains:</label>
  <input v-model="terrainsNumber" type="number" id="terrainsNumber" name="terrainsNumber" min="2" max="5" />
</template>