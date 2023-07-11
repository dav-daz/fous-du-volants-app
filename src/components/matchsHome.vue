<template>
  <button type="button">Mélangerd</button>
  <ul>
    <li v-for="player in playersSelected"
          :key="player.id"
          class="all-persons-list-item">
      <p class="person-card-name">{{ player.nom }}</p>
    </li>
  </ul>
</template>

<script>
export default {
  name: "matchsHome.vue",
  props: ['playersSelected']
}
</script>

<style scoped>

</style>