import { defineStore } from 'pinia';
import { supabase } from '@/lib/supabaseClient';

export const useSessionStore = defineStore('session', {
  state: () => ({
    user: null,
    isLoggedIn: false,
  }),

  actions: {
    async checkLoggedIn() {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          throw error;
        }
        if (session && session.user) {
          this.user = session.user;
          this.isLoggedIn = true;
          return;
        }

        const { data: { user }, error: getUserError } = await supabase.auth.getUser();
        if (getUserError) {
          throw getUserError;
        }

        this.user = user;
        this.isLoggedIn = user!== null;
      } catch (error) {
        console.error('Erreur de vérification de la session:', error);
        this.user = null;
        this.isLoggedIn = false;
      }
    },

    async updateSession() {
      await this.checkLoggedIn();
    },
  },
});