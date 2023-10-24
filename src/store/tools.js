import { defineStore } from 'pinia';
import content from '@/data/content.json';

export const useToolsStore = defineStore('tools', {
  state: () => ({
    texts: {
      resetPlayersTitle: content.reset_players.title,
      resetPlayersText: content.reset_players.text,
      addPlayerTitle: content.add_new_player.title,
      button: {
        init_confirm: content.button.init_confirm,
        add_to_list: content.button.add_to_list,
        modal_close: content.button.modal_close
      }
    },
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