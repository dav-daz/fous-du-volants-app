import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import { routes, routeGuard  } from './routes.js';

// font-awesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faUserPlus,
  faUserMinus,
  faXmark,
  faTrash,
  faSquarePlus,
  faSquareMinus,
  faPlus,
  faBars,
  faPen,
  faCheck,
  faRightToBracket,
  faRightFromBracket
} from "@fortawesome/free-solid-svg-icons";


library.add(
  faUserPlus,
  faUserMinus,
  faXmark,
  faTrash,
  faSquarePlus,
  faSquareMinus,
  faPlus,
  faBars,
  faPen,
  faCheck,
  faRightToBracket,
  faRightFromBracket
);

const pinia = createPinia()

const router = createRouter({
  history: createWebHistory(),
  routes
});

routeGuard(router);

const app = createApp(App)

//createApp(App).component("fa-icon", FontAwesomeIcon).mount('#app');

pinia.use((context) => {

  const storeId = context.store.$id;

  const serilizer = {
    serialize: JSON.stringify,
    deserialize: JSON.parse
  }

  //Sync du store avec le localstorage
  const fromStorage = serilizer.deserialize(window.localStorage.getItem(storeId));

  if (fromStorage) {
    context.store.$patch(fromStorage);
  }

  //Ecoute pour les changements et maj du localstorage
  context.store.$subscribe((mutation, state) => {
    window.localStorage.setItem(storeId, serilizer.serialize(state));
  })
})

app.component("fa-icon", FontAwesomeIcon);
app.use(pinia);
app.use(router);
app.mount('#app');
