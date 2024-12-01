<script setup>
import FormSignIn from "@/components/FormSignIn.vue";

import { useSessionStore } from '@/store/session';
const sessionStore = useSessionStore();
</script>

<template>
  <div class="content-page">
    <h1>Se connecter</h1>

    <FormSignIn />

    <!--
    <p  v-if="!sessionStore.isLoggedIn">
      <br>
      Pas de compte ? : <RouterLink to="/sign-up">créer un compte</RouterLink>
    </p>
    -->
  </div>
</template>