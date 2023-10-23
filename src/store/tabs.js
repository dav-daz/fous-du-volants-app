import { defineStore } from 'pinia';
import content from '@/data/content.json';

export const useTabsStore = defineStore('tabs', {
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