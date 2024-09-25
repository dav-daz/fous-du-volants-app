<script setup>
defineProps({
  match: {
    type: Array,
    required: true
  }
});
</script>

<template>
<div class="match-detail">
  <p class="match-team">
      <template v-for="(player, playerIndex) in match">
        {{ player }}<template v-if="playerIndex != match.length -1">, </template>
      </template>
    </p>
</div>
</template>