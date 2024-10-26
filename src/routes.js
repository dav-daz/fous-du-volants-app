import HomePage from "./pages/HomePage.vue"
import SignInPage from "./pages/SignInPage.vue"
import SignUpPage from "./pages/SignUpPage.vue"
import NotFoundPage from "./pages/NotFoundPage.vue"

import { useSessionStore } from '@/store/session'


const routes = [
  {
    path: '/',
    component: HomePage
  },
  {
    path: '/sign-in',
    component: SignInPage,
    meta: { requiresGuest: true }
  },
  {
    path: '/sign-up',
    component: SignUpPage,
    meta: { requiresGuest: true }
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFoundPage
  }
];


const routeGuard = (router) => {
  router.beforeEach((to, from, next) => {
    const sessionStore = useSessionStore()

    if (to.meta.requiresGuest) {
      if (sessionStore.isLoggedIn) {
        // Si l'utilisateur est connecté, redirigez vers le tableau de bord
        next('/');
      } else {
        next();
      }
    } else if (to.meta.requiresAuth) {
      if (!sessionStore.isLoggedIn) {
        // Si l'utilisateur n'est pas connecté, redirigez vers la page de connexion
        next('/sign-in');
      } else {
        next();
      }
    } else {
      next();
    }
  });
};

export { routes, routeGuard };