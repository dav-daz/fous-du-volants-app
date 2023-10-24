import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';

// font-awesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faUserPlus, faUserMinus, faXmark, faTrash, faSquarePlus, faSquareMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

library.add(faUserPlus, faUserMinus, faXmark, faTrash, faSquarePlus, faSquareMinus, faPlus);

const pinia = createPinia()
const app = createApp(App);

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
app.mount('#app');
