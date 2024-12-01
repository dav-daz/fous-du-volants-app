<script setup>
import { ref, watch, onMounted } from 'vue';

import toggleTheme from "@/components/toggleTheme.vue";

import { useSessionStore } from '@/store/session';
const sessionStore = useSessionStore();

import { useAuthStore } from '@/store/auth';
const authStore = useAuthStore();

sessionStore.checkLoggedIn();

const logout = async () => {
  await authStore.logout();

  toggleMenu()
}

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

watch(isMenuOpen, (newValue) => {
  if (newValue) {
    document.body.classList.add('no-scroll');
  } else {
    document.body.classList.remove('no-scroll');
  }
});
</script>

<template>

<div class="menu-main" :class="{ 'open': isMenuOpen }">
   <Transition name="fade">
      <div v-show="isMenuOpen" class="menu-overlay" @click="toggleMenu"></div>
   </Transition>

   <Transition name="slide-fade">
      <div v-show="isMenuOpen" class="menu-main-content">
        <div class="menu-main-top">
          <div class="connect">
            <RouterLink class="login" v-if="!sessionStore.isLoggedIn" to="/sign-in" @click="toggleMenu">
              <fa-icon icon="right-to-bracket" />
              <span class="visually-hidden">Se connecter</span>
            </RouterLink>

            <RouterLink class="logout" v-else to="/" @click="logout">
              <fa-icon icon="right-from-bracket" />
              <span class="visually-hidden">Se déconnecter</span>
            </RouterLink>
          </div>

          <toggleTheme />
        </div>
        
        <ul class="main-navigation">
          <li>
            <RouterLink to="/" @click="toggleMenu">Joueurs et matchs</RouterLink>
          </li>
          <li v-if="sessionStore.isLoggedIn">
            <RouterLink to="/admin-players" @click="toggleMenu">Admin Joueurs</RouterLink>
          </li>
        </ul>
      </div>
    </Transition>
    <button class="btn-icon menu-main-toggle" @click="toggleMenu" type="button">
      <fa-icon v-if="isMenuOpen" icon="xmark" />
      <fa-icon v-else icon="bars" />
   </button>
</div>

</template>

<style lang="scss">
.menu-main {
   position: fixed;
   top: 0;
   right: 0;
   display: flex;
   align-items: flex-start;
   gap: 2rem;
   height: 100%;
   z-index: 100;

   &-toggle {
      color: var(--text);
      height: 3.5rem;
      width: 3.5rem;
      border-radius: 50%;
      background-color: var(--violet);
      font-size: 2.5rem;
      position: absolute;
      top: 1rem;
      right: 2rem;
      transition: right 0.3s ease;
      z-index: 102;
   }

   &-content {
      position: absolute;
      top: 0;
      right: 0;
      background-color: var(--menu-background);
      padding: 1.5rem;
      width: 20rem;
      height: 100%;
      box-sizing: border-box;
      z-index: 101;
   }

   &-top {
    display: flex;
    justify-content: space-between;
    text-align: right;

    .login,
    .logout {
      display: block;
      width: 2.5rem;
      height: 2.5rem;

      .svg-inline--fa {
        width: 100%;
        height: auto;
      }
    }

    .login {
      color: var(--green);
    }

    .logout {
      color: var(--red);
    }
   }

   &.open {
      .menu-main-toggle {
         right: calc(20rem + 2rem); // Ajustez cette valeur selon la largeur de votre menu
      }
   }

   .menu-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 100;
    backdrop-filter: blur(2px);
  }
}

.main-navigation {
  margin-top: 3rem;

  a {
    display: block;
    padding: 1rem;
    margin-block: 1rem;
    color: var(--text);
    border-radius: 0.4rem;
    background-color: var(--card-background-selected);
  }
}

// Styles pour désactiver le défilement
.no-scroll {
  overflow: hidden; /* Désactive le défilement */
}

.slide-fade-enter-active,
.slide-fade-leave-active,
.fade-enter-active,
.fade-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.slide-fade-enter-to,
.slide-fade-leave-from {
  transform: translateX(0);
  opacity: 1;
}
</style>