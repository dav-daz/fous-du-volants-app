import { defineStore } from 'pinia';
import content from '@/data/content.json';

export const usePlayersStore = defineStore('players', {
    state: () => ({
        texts: {
            nbr_joueurs_select: content.home.nbr_joueurs_select,
          },
        currentTab: 'players'
    }),
    getters: {

    },
    actions: {
        tabSelect(tabName) {
            this.currentTab = tabName;
          }
    },
})