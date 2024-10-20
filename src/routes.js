import HomePage from "./pages/Home.vue"
import SignInPage from "./pages/SignIn.vue"
import SignUpPage from "./pages/SignUp.vue"

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
  }
]