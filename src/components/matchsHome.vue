<template>
  <button class="suffle" 
          type="button"
          @click="terrains(this.playersSelected.length)">
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
    },
    terrains(nbrPlayers){
      var nbJoueurs = nbrPlayers;
      var calcNbJoeursRestants = nbJoueurs%4;
      var calcNbTerrains = (nbJoueurs - calcNbJoeursRestants) /4;

      var calcNbTerrainsx4 = 0;
      var calcNbTerrainsx2 = 0;
      var calcNbTerrainsx3 = 0;
      var calcNbTerrainsx5 = 0;


      if(calcNbJoeursRestants === 2 || calcNbJoeursRestants === 3){
        calcNbTerrains = calcNbTerrains + 1;
      }

      if(calcNbJoeursRestants === 0){
        calcNbTerrainsx4 = calcNbTerrains;
      }

      if(calcNbJoeursRestants === 2){
        calcNbTerrainsx2 = 1;
        calcNbTerrainsx4 = (nbJoueurs - calcNbJoeursRestants) / 4;
      }

      if(calcNbJoeursRestants === 3){
        calcNbTerrainsx3 = 1;
        calcNbTerrainsx4 = (nbJoueurs - calcNbJoeursRestants) / 4;
      }

      if(calcNbJoeursRestants === 1){
        calcNbTerrainsx5 = 1;
        calcNbTerrainsx4 = (nbJoueurs - 5) / 4;
      }

      console.log('Nb joueurs : ' + nbJoueurs);
      console.log('Nb terrains : ' + calcNbTerrains);
      console.log('Nb joueurs restant : ' + calcNbJoeursRestants);
      console.log('Nb terrains x4 : ' + calcNbTerrainsx4);
      console.log('Nb terrains x3 : ' + calcNbTerrainsx3);
      console.log('Nb terrains x5 : ' + calcNbTerrainsx5);
      console.log('Nb terrains x2 : ' + calcNbTerrainsx2);
      console.log('-----------');
    }
  }
}
</script>

<style scoped>

</style>