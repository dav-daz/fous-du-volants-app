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
  <template v-for="(team, indexTeam) in match">
    <p class="match-team">
      <template v-for="(player, indexPlayer) in team">
        <span v-if="indexPlayer === 1"> et </span>
        {{ player }}
      </template>
    </p>
    <p v-if="indexTeam === 0" class="vs-sep">contre</p>
  </template>
</div>
</template>

<style lang="scss" scoped>
.vs-sep {
  margin: 10px 0;
}
</style>