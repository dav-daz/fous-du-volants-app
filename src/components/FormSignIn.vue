<script setup>
import { ref } from "vue";

import { useSessionStore } from '@/store/session';
const sessionStore = useSessionStore();

import { useAuthStore } from '@/store/auth';
const authStore = useAuthStore();

sessionStore.checkLoggedIn();

let email = ref("");
let password = ref("");

const login = async () => {
  await authStore.login(email.value, password.value);
}
</script>

<template>
<form class="form-connect">
  <div class="form-item">
		<label for="email"> E-mail: </label>
		<input type="email" id="email" v-model="email">
	</div>

	<div class="form-item">
		<label for="email"> Mot de passe: </label>
		<input type="password" id="password" v-model="password">
	</div>

	<div class="form-actions">
		<button class="modal-btn" type="button" @click="login">Se connecter</button>
	</div>
</form>
</template>
