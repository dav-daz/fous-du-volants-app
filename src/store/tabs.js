import { defineStore } from 'pinia';

export const useTabsStore = defineStore('tabs', {
    state: () => ({
        currentTab: 'players'
    }),
    actions: {
        tabSelect(tabName) {
            this.currentTab = tabName;
          }
    },
})