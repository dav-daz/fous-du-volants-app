<script setup>
  import tools from "@/components/tools.vue";
  import { usePlayersStore } from "@/store/players.js";

  const playersStore = usePlayersStore();
</script>

<template>
  <tools />

  <ul class="all-persons-list">
    <li v-for="player in playersStore.registeredPersons"
        :key="player.id"
        class="all-persons-list-item">

      <div v-bind:class="{selected: playersStore.playersSelected.find(el => el.id == player.id)}" class="person-card">
        <p class="person-card-name">{{ player.nom }}</p>
        <div class="person-card-buttons">
          <button @click="playersStore.addPlayer(player)" 
                  class="person-card-buttons-button add btn-icon" 
                  type="button">
            <fa-icon icon="user-plus" size="2x" />
          </button>

          <button @click="playersStore.deletePlayer(player)" 
                  class="person-card-buttons-button delete btn-icon" 
                  type="button">
            <fa-icon icon="user-minus" size="2x" />
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
  }
}
</style>