<script setup>
import { ref } from "vue";

import { useRouter } from 'vue-router';
const router = useRouter();

import { useSessionStore } from '@/store/session';
const sessionStore = useSessionStore();

import { useAuthStore } from '@/store/auth';
const authStore = useAuthStore();

sessionStore.checkLoggedIn();

let email = ref("");
let password = ref("");
let isSuccess = ref(false);
let message = ref("");

const login = async () => {
  try {
    await authStore.login(email.value, password.value);
    isSuccess.value = true;
    message.value = "Connexion réussie! Redirection en cours...";
    setTimeout(() => {
      router.push('/');
    }, 5000);
  } catch (error) {
    console.error('Erreur de connexion:', error);
  }
}
</script>

<template>
	 <div v-if="isSuccess">
    <p>{{ message }}</p>
  </div>
<form v-else class="form-connect">
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
