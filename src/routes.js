import HomePage from "./pages/HomePage.vue"
import SignInPage from "./pages/SignInPage.vue"
import SignUpPage from "./pages/SignUpPage.vue"
import NotFoundPage from "./pages/NotFoundPage.vue"

export const routes = [
  {
    path: '/',
    component: HomePage
  },
  {
    path: '/sign-in',
    component: SignInPage
  },
  {
    path: '/sign-up',
    component: SignUpPage
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFoundPage
  }
]