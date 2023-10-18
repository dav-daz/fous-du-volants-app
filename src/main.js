import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';

// font-awesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faUserPlus, faUserMinus, faXmark, faTrash, faSquarePlus, faSquareMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

library.add(faUserPlus, faUserMinus, faXmark, faTrash, faSquarePlus, faSquareMinus, faPlus);

const app = createApp(App);

//createApp(App).component("fa-icon", FontAwesomeIcon).mount('#app');

app.component("fa-icon", FontAwesomeIcon);
app.use(createPinia());
app.mount('#app');
