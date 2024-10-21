import { defineStore } from 'pinia';
import { supabase } from '@/lib/supabaseClient';
import { useSessionStore } from '@/store/session.js';

export const useAuthStore = defineStore('auth', {
  actions: {
    async login(email, password) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
          throw error;
        }
        const sessionStore = useSessionStore();
        await sessionStore.checkLoggedIn();
      } catch (error) {
        console.error('Erreur de connexion:', error);
      }
    },

    async register(email, password) {
      try {
        let { error } = await supabase.auth.signUp({
          email: email,
          password: password
        })

        if (error) {
          throw error;
        }
        const sessionStore = useSessionStore();
        await sessionStore.checkLoggedIn();

        alert('Check your email for the login link!')
      } catch (error) {
        if (error instanceof Error) {
          console.error('Erreur d\'inscription:', error);
          alert(error.message)
        }
      }
    },

    async logout() {
      try {
        await supabase.auth.signOut();
        const sessionStore = useSessionStore();
        sessionStore.user = null;
        sessionStore.isLoggedIn = false;
      } catch (error) {
        console.error('Erreur de déconnexion:', error);
      }
    },
  },
});