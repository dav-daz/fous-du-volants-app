import { defineStore, storeToRefs } from 'pinia';

export const useMatchsStore = defineStore('matchs', {
  state: () => ({
    infos: {},
    matchs: {
      x2: [],
      x3: [],
      x4: [],
      x5: [],
      x6: [],
      x7: []
    },
    matchNumber: 0,
    maxTerrains: 1
  }),
  actions: {
    resetMatch() {
      this.matchs = {
        x2: [],
        x3: [],
        x4: [],
        x5: [],
        x6: [],
        x7: []
      };

      if(window.localStorage.getItem('matchs')) {
        localStorage.removeItem(JSON.parse(window.localStorage.getItem('matchs')).matchs);
      }
    },

    setMaxTerrains(number) {
      this.maxTerrains = number;
    },

    increment() {
      this.matchNumber + 1;

      return this.matchNumber;
    },
    init(playersArray) {
      this.resetMatch();
    
      if (playersArray && playersArray.length) {
        this.infos = this.infosMatchs(playersArray);
    
        if (this.infos.nb_players > 1) {
          const shuffledPlayers = this.shuffleArray([...playersArray]);
          let playerIndex = 0;
    
          for (let courtType of ['x7', 'x6', 'x5', 'x4', 'x3', 'x2']) {
            const courtCount = this.infos[`nb_terrains_${courtType}`];
            if (courtCount) {
              this.matchs[courtType] = [];
              for (let i = 0; i < courtCount; i++) {
                if (courtType === 'x4') {
                  // Traitement spécial pour les terrains de quatre joueurs
                  let match = [[], []];
                  for (let team = 0; team < 2; team++) {
                    for (let player = 0; player < 2; player++) {
                      if (playerIndex < shuffledPlayers.length) {
                        match[team].push(shuffledPlayers[playerIndex]?.nom || 'Joueur inconnu');
                        playerIndex++;
                      }
                    }
                  }
                  this.matchs[courtType].push(match);
                } else {
                  // Pour les autres types de terrains, on garde la structure actuelle
                  let court = [];
                  for (let j = 0; j < parseInt(courtType.substring(1)); j++) {
                    if (playerIndex < shuffledPlayers.length) {
                      court.push(shuffledPlayers[playerIndex]?.nom || 'Joueur inconnu');
                      playerIndex++;
                    }
                  }
                  this.matchs[courtType].push(court);
                }
              }
            }
          }
        }
      } else {
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
    infosMatchs(array) {
      if (array.length) {
        const nbJoueurs = array.length;
        const maxTerrains = this.maxTerrains;

        //console.log("Nombre de joueurs:", nbJoueurs, "Max terrains:", maxTerrains); // Pour le débogage

        let distribution = this.distributePlayersOnCourts(nbJoueurs, maxTerrains);

        return {
          'nb_players': nbJoueurs,
          'nb_terrains': distribution.totalCourts,
          'nb_terrains_x2': distribution.x2 || null,
          'nb_terrains_x3': distribution.x3 || null,
          'nb_terrains_x4': distribution.x4 || null,
          'nb_terrains_x5': distribution.x5 || null,
          'nb_terrains_x6': distribution.x6 || null,
          'nb_terrains_x7': distribution.x7 || null
        };
      } else {
        return { 'nb_players': 0 };
      }
    },
    distributePlayersOnCourts(totalPlayers, maxCourts) {
      let distribution = { totalCourts: 0 };
      let remainingPlayers = totalPlayers;
    
      const addCourts = (size, count) => {
        distribution[`x${size}`] = (distribution[`x${size}`] || 0) + count;
        remainingPlayers -= size * count;
        distribution.totalCourts += count;
      };
    
      // Commencer par créer des terrains de 4 joueurs
      let courtsOf4 = Math.min(Math.floor(remainingPlayers / 4), maxCourts);
      addCourts(4, courtsOf4);
    
      // Distribuer les joueurs restants
      while (remainingPlayers > 0 && distribution.totalCourts < maxCourts) {
        if (remainingPlayers >= 4) {
          addCourts(4, 1);
        } else if (remainingPlayers === 3) {
          addCourts(3, 1);
        } else if (remainingPlayers === 2) {
          addCourts(2, 1);
        } else if (remainingPlayers === 1) {
          // Ajouter le dernier joueur à un terrain existant si possible
          let added = false;
          for (let size = 4; size <= 6; size++) {
            if (distribution[`x${size}`]) {
              distribution[`x${size}`]--;
              distribution[`x${size + 1}`] = (distribution[`x${size + 1}`] || 0) + 1;
              remainingPlayers--;
              added = true;
              break;
            }
          }
          if (!added) {
            addCourts(1, 1);
          }
        }
      }
    
      // Équilibrer les terrains si nécessaire
      while (remainingPlayers > 0) {
        for (let size = 2; size <= 6; size++) {
          while (distribution[`x${size}`] && remainingPlayers > 0) {
            distribution[`x${size}`]--;
            distribution[`x${size + 1}`] = (distribution[`x${size + 1}`] || 0) + 1;
            remainingPlayers--;
          }
        }
      }
    
      //console.log("Distribution finale:", distribution);
      return distribution;
    }
  }
})