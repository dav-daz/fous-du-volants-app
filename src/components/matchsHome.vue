<template>
  <button class="suffle" 
          type="button"
          @click="sufflePlayers()">
    Mélanger
  </button>
  <ul>
    <li v-for="player in shufflePlayersSelected"
          :key="player.id"
          class="all-persons-list-item">
      <p class="person-card-name">{{ player.nom }}</p>
    </li>
  </ul>
</template>

<script>
// import helpers functions
import helpers from '@/helpers/helpers'

export default {
  name: "matchsHome.vue",
  props: ['playersSelected'],
  data() {
    return {
      shufflePlayersSelected: [],
      matchsArray: []
    }
  },
  methods:{
    sufflePlayers() {
      this.shufflePlayersSelected = helpers.randomize(this.playersSelected);

      console.log(this.shufflePlayersSelected);

      //console.log(helpers.terrains(this.shufflePlayersSelected.length));
    }
  }
}
</script>

<style scoped>

</style>