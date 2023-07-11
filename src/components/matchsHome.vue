<template>
  <button class="suffle" 
          type="button"
          @click="suffle()">
    Mélanger
  </button>
  <ul>
    <li v-for="player in sufflePlayersSelected"
          :key="player.id"
          class="all-persons-list-item">
      <p class="person-card-name">{{ player.nom }}</p>
    </li>
  </ul>
</template>

<script>
export default {
  name: "matchsHome.vue",
  props: ['playersSelected'],
  data() {
    return {
      sufflePlayersSelected: []
    }
  },
  methods:{
    suffle () {
      this.sufflePlayersSelected = this.playersSelected.sort(() => Math.random() - 0.5);

      console.log(this.sufflePlayersSelected);
    }
  }
}
</script>

<style scoped>

</style>