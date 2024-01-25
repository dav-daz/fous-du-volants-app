import { defineStore, storeToRefs } from 'pinia';

export const useMatchsStore = defineStore('matchs', {
  state: () => ({
    infos: {},
    matchs: {
      x4: [],
      x5: [],
      x3: [],
      x2: []
    },
    matchNumber: 0
  }),
  getters: {

  },
  actions: {
    resetMatch() {
      this.matchs = {
        x4: [],
        x5: [],
        x3: [],
        x2: []
      };

      if(window.localStorage.getItem('matchs')) {
        localStorage.removeItem(JSON.parse(window.localStorage.getItem('matchs')).matchs);
      }
    },

    increment() {
      this.matchNumber + 1;

      return this.matchNumber;
    },
    init (playersArray) {
      this.resetMatch();

      if(playersArray.length){
        this.infos = this.infosMatchs(playersArray);

        if(this.infos.nb_players > 1) {
          this.shuffleArray(playersArray);

          if(this.infos.nb_terrains_x4){
            this.matchs.x4 = this.matchMaking(this.infos.nb_terrains_x4, 4, playersArray);
          }

          if(this.infos.nb_terrains_x5){
            this.matchs.x5 = this.matchMaking(this.infos.nb_terrains_x5, 5, playersArray);
          }

          if(this.infos.nb_terrains_x3){
            this.matchs.x3 = this.matchMaking(this.infos.nb_terrains_x3, 3, playersArray);
          }

          if(this.infos.nb_terrains_x2 > 0){
            this.matchs.x2 = this.matchMaking(this.infos.nb_terrains_x2, 2, playersArray);
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
    matchMaking(groundNumber, numberPlayers, playersArray){
      let match = [];

      for (var g = 0; g <= groundNumber-1; g++) {
        match[g] = [];

        if(numberPlayers === 4){
          for (var i = 0; i <= 1; i++) {
            match[g][i] = [];

            for (var j = 0; j <= 1; j++) {
              this.shuffleArray(playersArray);
              match[g][i][j] = playersArray.pop().nom;
            }
          }
        } else {
          for (var i = 0; i <= numberPlayers-1; i++) {
            this.shuffleArray(playersArray);
            match[g][i] = playersArray.pop().nom;
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
})