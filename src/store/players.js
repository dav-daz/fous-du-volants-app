import { defineStore } from 'pinia';

import { useToolsStore } from "@/store/tools";

import content from '@/data/content.json';

export const usePlayersStore = defineStore('players', {
    state: () => ({
      registeredPersons: content.registeredPersons,
      playersSelected: [],
      newPlayers: []
    }),
    getters: {

    },
    actions: {
      addPlayer (player) {
        // on regarde si le joueur est déjà dans le tableau
        let found = this.playersSelected.find(el => el.id == player.id);
  
        if(!found) {
          this.playersSelected.push({
            id: player.id,
            nom: player.nom
          });
        }
      },
      deletePlayer (player) {
        // retrouve l'index de mon object "player"
        const indexPlayer = this.playersSelected.map(i => i.id).indexOf(player.id);
  
        if(indexPlayer > -1) {
          // si on retrouve, on supprime du tableau
          this.playersSelected.splice(indexPlayer, 1);
        }
      },
      addNewPlayers(players) {
        const toolsStore = useToolsStore();

        if(players.length){
          for (var i = 0, length = players.length; i < length; i++) {
            let playerName = players[i].nom;
            let playerID = players[i].id;
  
            this.registeredPersons.push({
              id: playerID,
              nom: playerName
            });
  
            this.playersSelected.push({
              id: playerID,
              nom: playerName
            });
  
            this.newPlayers.push({
              id: playerID,
              nom: playerName
            });
    
            toolsStore.showModal = false;
          }
        }
        
      },
      deleteNewPlayers() {
        // on parcours le tableau 'newPlayers' pour prendre les id
        for (var j = 0, length = this.newPlayers.length; j < length; j++) {
          let idNewPlayer = this.newPlayers[j].id;
  
          // retrouve l'index de "idNewPlayer" dans le tableau 'registeredPersons'
          const indexPlayer = this.registeredPersons.map(i => i.id).indexOf(idNewPlayer);
  
          if(indexPlayer > -1) {
            // si on retrouve, on supprime du tableau
            this.registeredPersons.splice(indexPlayer, 1);
          }
        }
  
        this.newPlayers = [];
      },
      reset() {
        const toolsStore = useToolsStore();

        this.deleteNewPlayers();
        this.playersSelected = [];
  
        toolsStore.showModal = false;
      }
    },
})