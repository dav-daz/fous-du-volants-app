<script setup>
import { onMounted } from 'vue';

  import tools from "@/components/tools.vue";

  import { useSupabasePlayerStore } from '@/store/SupabasePlayerStore.js';
  const store = useSupabasePlayerStore();

  onMounted(async () => {
    await store.fetchPlayers();
  });

  const update = async (id, data) => {
    await store.editPlayer(id, data, null, null);
    await store.fetchPlayers();
  }
</script>

<template>
  <tools />

  <ul class="all-persons-list">
    <li v-for="player in store.players"
        :key="player.id"
        class="all-persons-list-item">

      <div :class="{selected: player.selected, invite: player.invite}" class="person-card">
        <p class="person-card-name">
          {{ player.prenom }}
        </p>

        <div class="person-card-buttons">
          <button @click="update(player.id, { selected: true })" 
                  class="person-card-buttons-button add btn-icon" 
                  type="button">

            <fa-icon icon="user-plus" size="2x" />
            <span class="visually-hidden">Ajouter le joueur</span>
          </button>

          <button @click="update(player.id, { selected: false })" 
                  class="person-card-buttons-button delete btn-icon" 
                  type="button">

            <fa-icon icon="user-minus" size="2x" />
            <span class="visually-hidden">Enlever le joueur</span>
          </button>
        </div>
      </div>

    </li>
  </ul>
</template>

<style lang="scss">
#app {
  .tools {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1.5rem;
    margin-bottom: 4rem;
  }

  .all-persons-list {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;

    &-item {
      width: calc(50% - 0.5rem);
      list-style: none;
    }
  }

  .person-card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 1.6rem;
    background-color: var(--card-background);
    border-radius: $border-radius-4;
    transition: all ease-in-out 0.3s;

    &-name {
      font-size: 1.8rem;
      font-weight: 700;
    }

    &-buttons {
      &-button {
        color: var(--text);

        &.delete {
          display: none;
        }
      }
    }

    &.selected {
      background-color: var(--card-background-selected);

      .add {
        display: none;
      }

      .delete {
        display: inline-block;
      }
    }

    &.invite {
      opacity: 0.5;
    }
  }
}
</style>