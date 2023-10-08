<template>
  <button class="suffle" 
          type="button"
  >
    Mélanger
  </button>
  <ul>
    <li v-for="player in playersInit"
          :key="player.id"
          class="all-persons-list-item">
      <p class="person-card-name">{{ player.nom }}</p>
    </li>
  </ul>
</template>

<script>
// import helpers functions
//import helpers from '@/helpers/helpers'

export default {
  name: "matchsHome.vue",
  props: ['playersSelected'],
  data: () => {
    return {
      infos: {},
      playersInit: JSON.parse(localStorage.getItem('localPlayersSelected')),
      matchs: {
        x4: [],
        x5: [],
        x3: [],
        x2: []
      }
    }
  },
  mounted() {
    this.init();
  },
  methods:{
    init () {
      this.infos = this.infosMatchs(JSON.parse(localStorage.getItem('localPlayersSelected')));

      this.shuffleArray(this.playersInit);


      if(this.infos.nb_terrains_x4){
        this.matchs.x4 = this.matchMaking(this.infos.nb_terrains_x4, 4);
      }

      
      if(this.infos.nb_terrains_x5){
        this.matchs.x5 = this.matchMaking(this.infos.nb_terrains_x5, 5);
      }

      if(this.infos.nb_terrains_x3){
        this.matchs.x3 = this.matchMaking(this.infos.nb_terrains_x3, 3);
      }

      if(this.infos.nb_terrains_x2){
        this.matchs.x2 = this.matchMaking(this.infos.nb_terrains_x2, 2);
      }

    },
    /**
     * Construit les matchs
     *
     * @param {number} groundNumber le nombre de terrains.
     * @param {number} numberPlayers le nombre de joueurs sur le terrain.
     * @return {array} match le tableau des matchs.
     */
    matchMaking(groundNumber, numberPlayers){
      let match = [];

      for (var g = 0; g <= groundNumber-1; g++) {
        match[g] = [];

        if(numberPlayers === 4){
          for (var i = 0; i <= 1; i++) {
            match[g][i] = [];

            for (var j = 0; j <= 1; j++) {
              this.shuffleArray(this.playersInit);
              match[g][i][j] = this.playersInit.pop().nom;
            }
          }
        } else {
          for (var i = 0; i <= numberPlayers-1; i++) {
            this.shuffleArray(this.playersInit);
            match[g][i] = this.playersInit.pop().nom;
          }
        }
      }

      return match;
    },
    /**
     * Mélange un tableau (algorithme de Fisher)
     *
     * @param {array} array le tableau à mélanger.
     * @return {array} le tableau mélangé.
     */
    shuffleArray (array) {
      var i, j, tmp;
      for (i = array.length - 1; i > 0; i--) {
          j = Math.floor(Math.random() * (i + 1));
          tmp = array[i];
          array[i] = array[j];
          array[j] = tmp;
      }
      return array;
    },
    /**
     * Génére les infos des matchs
     *
     * @param {array} array le tableau des joueurs.
     * @return {array} un tableau des infos.
     */
    infosMatchs (array) {
      var nbJoueurs = array.length;
      var calcNbJoeursRestants = nbJoueurs%4;
      var calcNbTerrains = (nbJoueurs - calcNbJoeursRestants) /4;

      var calcNbTerrainsx4 = null;
      var calcNbTerrainsx2 = null;
      var calcNbTerrainsx3 = null;
      var calcNbTerrainsx5 = null;


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
        if(calcNbTerrainsx4 <= 0) {
          calcNbTerrainsx4 = null;
        }
      }

      return {
        'nb_players': nbJoueurs,
        'nb_terrains': calcNbTerrains,
        'nb_players_rest': calcNbJoeursRestants,
        'nb_terrains_x4': calcNbTerrainsx4,
        'nb_terrains_x3': calcNbTerrainsx3,
        'nb_terrains_x5': calcNbTerrainsx5,
        'nb_terrains_x2': calcNbTerrainsx2
      }
    }
  }
}
</script>

<style scoped>

</style>