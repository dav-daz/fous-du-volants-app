import { defineStore } from 'pinia';

export const useTogglethemeStore = defineStore('toggletheme', {
    state: () => ({
        isDarkTheme: false
    }),
    actions: {
      initPreferTheme () {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          document.documentElement.setAttribute('data-theme', 'dark');
          this.isDarkTheme = true;
        }else{
          document.documentElement.setAttribute('data-theme', 'light');
          this.isDarkTheme = false;
        }
      },
      changeTheme () {
        this.isDarkTheme = !this.isDarkTheme;

        document.documentElement.setAttribute(
          'data-theme',
          this.isDarkTheme ? 'dark' : 'light'
        );
      },
    },
})