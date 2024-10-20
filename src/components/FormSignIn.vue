<script setup>

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
		<button class="modal-btn" type="button">Se connecter</button>
	</div>
</form>
</template>
