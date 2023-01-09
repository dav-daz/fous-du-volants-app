import { createApp } from 'vue';
import App from './App.vue';

// font-awesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faUserPlus, faUserMinus, faXmark } from "@fortawesome/free-solid-svg-icons";

library.add(faUserPlus, faUserMinus, faXmark);

createApp(App).component("fa-icon", FontAwesomeIcon).mount('#app');
