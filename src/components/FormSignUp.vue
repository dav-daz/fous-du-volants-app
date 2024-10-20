<script setup>
import { ref } from "vue";
import { supabase } from '@/lib/supabaseClient';

let email = ref("");
let password = ref("");


const createAccount = async () => {

	try {
		let { data, error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value
  })
	} catch {

	}
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
		<button class="modal-btn" type="button" @click="createAccount">Créer le compte</button>
	</div>
</form>
</template>
