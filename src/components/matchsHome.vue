<template>
  <p v-if="this.infos.nb_players > 1" class="shuffle">
    <button type="button" @click="init()" class="shuffle-btn">
      Mélanger
    </button>
  </p>

  <ul class="type-match" v-if="this.matchs.x5.length">
    <li v-for="(match, indexMatch) in this.matchs.x5" class="match">
      <div class="match-head">Match {{ this.increment() }}</div>
      <div class="match-detail">
        <p class="match-team">
            <template v-for="(player, playerIndex) in match">
              {{ player }}<template v-if="playerIndex != match.length -1">, </template>
            </template>
          </p>
      </div>
    </li>
  </ul>

  <ul class="type-match" v-if="this.matchs.x3.length">
    <li v-for="(match, indexMatch) in this.matchs.x3" class="match">
      <div class="match-head">Match {{ this.matchNumber + 1 }}</div>
      <div class="match-detail">
        <p class="match-team">
          <template v-for="(player, playerIndex) in match">
            {{ player }}<template v-if="playerIndex != match.length -1">, </template>
          </template>
        </p>
      </div>
    </li>
  </ul>

  <ul class="type-match" v-if="this.matchs.x2.length">
    <li v-for="(match, indexMatch) in this.matchs.x2" class="match">
      <div class="match-head">Match {{ this.matchNumber }}</div>
      <div class="match-detail">
        <p class="match-team">
            <template v-for="(player, playerIndex) in match">
              {{ player }}<template v-if="playerIndex != match.length -1"> contre </template>
            </template>
          </p>
      </div>
    </li>
  </ul>

  <ul class="type-match" v-if="this.matchs.x4.length">
    <li v-for="(match, indexMatch) in this.matchs.x4" class="match">
      <div class="match-head">Match {{ this.matchNumber }}</div>
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
    </li>
  </ul>

  <p v-if="this.infos.nb_players <= 1" class="msg-error-match">Il n'y a pas assez de joueurs.</p>
</template>

<script>
// import helpers functions
//import helpers from '@/helpers/helpers'

export default {
  name: "matchsHome.vue",
  data: () => {
    return {
      infos: {},
      playersInit: JSON.parse(localStorage.getItem('localPlayersSelected')),
      matchs: {
        x4: [],
        x5: [],
        x3: [],
        x2: []
      },
      matchNumber: 0
    }
  },
  mounted() {
    this.init();
  },
  methods:{
    increment() {
      this.matchNumber + 1;

      return this.matchNumber;
    },
    init () {
      if(localStorage.getItem('localPlayersSelected')){
        this.infos = this.infosMatchs(JSON.parse(localStorage.getItem('localPlayersSelected')));

        if(this.infos.nb_players > 1) {
          this.playersInit = JSON.parse(localStorage.getItem('localPlayersSelected'));
        
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
        }
      }else{
        this.infos = this.infosMatchs([]);
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
      if(array.length){
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
      }else{
        return {
          'nb_players': 0
        }
      }
      
    }
  }
}
</script>

<style lang="scss" scoped>
#app {
  .shuffle {
    text-align: center;
    margin-bottom: 3rem;

    &-btn {
      border: none;
      background-color: $c-green;
      padding: 1rem 1.5rem;
      border-radius: 3rem;
      font-size: 1.5rem;
      font-weight: 700;
    }
  }
  .type-match {
    margin-top: 1.5rem;
  }

  .vs-sep {
    margin: 10px 0;
  }

  .msg-error-match {
    text-align: center;
    color: $c-red;
    font-weight: 700;
  }
  .match {
    font-size: 1.5rem;
    border-radius: $border-radius-4;
    background-color: $c-blue-light;
    padding: 1rem;

    &-head,
    &-detail {
      
    }

    &-head {
      color: rgba($c-black, 0.5);
      margin-bottom: 1rem;
    }

    &-detail {
      text-align: center;
    }

    + .match {
      margin-top: 1.5rem;
    }
  }
}
  

</style>