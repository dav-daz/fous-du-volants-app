<script setup>
import { ref, watch } from 'vue';

import { useMatchsStore } from "@/store/matchs";
import { storeToRefs } from 'pinia';

const matchsStore = useMatchsStore();
const { maxTerrains } = storeToRefs(matchsStore);

const terrainsNumber = ref(maxTerrains.value);
const tempValue = ref(terrainsNumber.value);

// Utiliser un watcher pour mettre à jour le store chaque fois que terrainsNumber change
watch(terrainsNumber, (newValue) => {
  if (newValue >= 2 && newValue <= 10) {
    matchsStore.setMaxTerrains(newValue);
    tempValue.value = newValue;
    matchsStore.init(JSON.parse(window.localStorage.getItem('players')).playersSelected);
  }
});

const handleFocus = () => {
  terrainsNumber.value = '';
};

const handleBlur = () => {
  if (terrainsNumber.value === '' || isNaN(terrainsNumber.value) || terrainsNumber.value < 2 || terrainsNumber.value > 10) {
    terrainsNumber.value = tempValue.value;
  } else {
    terrainsNumber.value = parseInt(terrainsNumber.value);
  }
};
</script>

<template>
  <div class="select-number-terrains">
    <label class="field-label" for="terrainsNumber">Nombre de terrains:</label>
    <input
      v-model="terrainsNumber"
      class="field-input"
      type="number"
      id="terrainsNumber"
      name="terrainsNumber"
      min="2"
      max="10"
      @focus="handleFocus"
      @blur="handleBlur"
    />
  </div>
</template>

<style lang="scss" scoped>
.select-number-terrains {
  text-align: center;
  margin-bottom: 4rem;

  .field {
    &-label {
      margin-right: 1.5rem;
    }

    &-input {
      border: 1px solid var(--text);
      border-radius: 1rem;
      padding: 0.5rem;
      background: transparent;
      color: var(--text);
      font-weight: 700;
      width: 4rem;
      text-align: center;
    }
  }
}
</style>