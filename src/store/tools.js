import { defineStore } from 'pinia';

export const useToolsStore = defineStore('tools', {
  state: () => ({
    showModal: false,
    componentInModal: '',
  }),
  actions: {
    loadModal (componentToLoad) {
      this.componentInModal = componentToLoad;
      this.showModal = true;
    },
  },
})