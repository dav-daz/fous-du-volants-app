import { defineStore } from 'pinia';
import { supabase } from '@/lib/supabaseClient';

export const useSupabasePlayerStore = defineStore('players', {
  state: () => ({
    players: []
  }),

  actions: {
    async fetchPlayers() {
      try {
        const { data, error } = await supabase
          .from('Joueurs')
          .select('*')
          .order('prenom', { ascending: true });

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
        const { data, error } = await supabase.from('Joueurs').insert([player]);

        if (error) {
          throw error;
        }
        
        console.log('Réponse de Supabase après insertion:', data, error);
        
        if (data && data.length > 0) {
          this.players.push(data[0]);
        } else {
          // Utiliser les données d'origine du joueur si aucune donnée n'est retournée
          this.players.push(player);
        }
      } catch (error) {
        console.error('Erreur lors de l\'ajout du joueur:', error);
      }
    },

    async removePlayer(id) {
      try {
        const { error } = await supabase.from('Joueurs').delete().eq('id', id);

        if (error) {
          throw error;
        }

        this.players = this.players.filter(player => player.id!== id);

      } catch (error) {
        console.error('Erreur lors de la suppression du joueur:', error);
        alert('Erreur lors de la suppression du joueur. Veuillez réessayer.');
      }
    },

    async editPlayer(id, updatedPlayer) {
      try {
        const { data, error } = await supabase
        .from('Joueurs')
        .update({...updatedPlayer })
        .eq('id', id);

        if (error) {
          throw error;
        }

        const index = this.players.findIndex(player => player.id === id);

        if (index!== -1) {
          this.players[index] = {...this.players[index],...updatedPlayer };
        }

      } catch (error) {
        console.error('Erreur lors de la mise à jour du joueur:', error);
      }
    }
  },

  getters: {
    getAllPlayers: (state) => state.players,
    getPlayerById: (state) => (id) => state.players.find(player => player.id === id)
  }
});