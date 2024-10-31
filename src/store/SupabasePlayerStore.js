import { defineStore } from 'pinia';
import { supabase } from '@/lib/supabaseClient';

export const useSupabasePlayerStore = defineStore('players', {
  state: () => ({
    players: []
  }),

  actions: {
    async fetchPlayers(filters = {}) {
      try {
        let query = supabase.from('Joueurs').select('*').order('prenom', { ascending: true });
    
        // Appliquer les filtres dynamiques
        for (const [field, value] of Object.entries(filters)) {
          if (value!== null && value!== undefined) {
            query = query.eq(field, value);
          }
        }
    
        const { data, error } = await query;
    
        if (error) {
          throw error;
        }
    
        this.players = data;
      } catch (error) {
        console.error('Erreur lors de la récupération des joueurs:', error);
      }
    },

    async addPlayer(player) {
      try {
        const { data, error } = await supabase.from('Joueurs').insert(player);

        if (error) {
          throw error;
        }
        
        console.log('Réponse de Supabase après insertion:', data, error);
        
        if (data && data.length > 0) {
          this.players.push(...data);
        } else {
          // Utiliser les données d'origine du joueur si aucune donnée n'est retournée
          this.players.push(...player);
        }
      } catch (error) {
        console.error('Erreur lors de l\'ajout du joueur:', error);
      }
    },

    async removePlayer(playerId, filterColumn, filterValue) {
      try {
        let query = supabase
        .from('Joueurs')
        .delete();

        if (playerId === null) {
          query = query.eq(filterColumn, filterValue);
        } else {
          query = query.eq('id', playerId);
        }

        const { data: updatedPlayers, error } = await query;

        if (error) {
          throw error;
        }

        if (playerId !== null) {
          this.players = this.players.filter(player => player.id!== playerId);
        }

      } catch (error) {
        console.error('Erreur lors de la suppression du joueur:', error);
        alert('Erreur lors de la suppression du joueur. Veuillez réessayer.');
      }
    },

    async editPlayer(playerId, data, filterColumn, filterValue) {
      try {
        let query = supabase
        .from('Joueurs')
        .update(data);

        if (playerId === null) {
          query = query.eq(filterColumn, filterValue);
        } else {
          query = query.eq('id', playerId);
        }

        const { data: updatedPlayers, error } = await query;

        if (error) {
          throw error;
        }


      if (playerId !== null) {
        // Mettre à jour le state avec le joueur mis à jour
        const index = this.players.findIndex(player => player.id === playerId);

        if (index!== -1) {
          this.players[index] = {...this.players[index],...updatedPlayers };
        }
      }

      } catch (error) {
        console.error('Erreur lors de la mise à jour des joueurs :', error);
        throw error;
      }
    }
  },

  getters: {
    getAllPlayers: (state) => state.players,
    getPlayerById: (state) => (id) => state.players.find(player => player.id === id)
  }
});