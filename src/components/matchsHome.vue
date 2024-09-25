<script setup>
  import content from '@/data/content.json';

  import { useMatchsStore } from "@/store/matchs";

  import ItemMatchMultiPlayers from '@/components/items/ItemMatchMultiPlayers.vue';
  import ItemMatchX2Players from '@/components/items/ItemMatchX2Players.vue';
  import ItemMatchX4Players from '@/components/items/ItemMatchX4Players.vue';

  const matchsStore = useMatchsStore();

  matchsStore.setMaxTerrains(4);

  let playersSelct = true;

  if(window.localStorage.getItem('players')){
    const infos = matchsStore.infosMatchs(JSON.parse(window.localStorage.getItem('players')).playersSelected);

    if (!infos.distribution_failed) {
      matchsStore.init(JSON.parse(window.localStorage.getItem('players')).playersSelected);
    }
  }else{
    playersSelct = false;
  }

  function start() {
    matchsStore.init(JSON.parse(window.localStorage.getItem('players')).playersSelected);
  }
</script>

<template>
  <p v-if="matchsStore.errorMessage" v-html="matchsStore.errorMessage" class="msg-error-match"></p>
  
  <template v-else>
    <p v-if="matchsStore.infos.nb_players > 1" class="shuffle">
      <button type="button" @click="start" class="shuffle-btn">
        {{ content.button.melanger_matchs }}
      </button>
    </p>

    <ul class="type-match" v-if="matchsStore.matchs.x4.length">
      <li v-for="(match, indexMatch) in matchsStore.matchs.x4" class="match">
        <ItemMatchX4Players :match="match" />
      </li>
    </ul>

    <ul class="type-match" v-if="matchsStore.matchs.x5.length || matchsStore.matchs.x6.length || matchsStore.matchs.x7.length">
      <li v-if="matchsStore.matchs.x5.length" v-for="(match, indexMatch) in matchsStore.matchs.x5" class="match">
        <ItemMatchMultiPlayers :match="match" />
      </li>

      <li v-if="matchsStore.matchs.x6.length" v-for="(match, indexMatch) in matchsStore.matchs.x6" class="match">
        <ItemMatchMultiPlayers :match="match" />
      </li>

      <li v-if="matchsStore.matchs.x7.length" v-for="(match, indexMatch) in matchsStore.matchs.x7" class="match">
        <ItemMatchMultiPlayers :match="match" />
      </li>
    </ul>

    <ul class="type-match" v-if="matchsStore.matchs.x3.length">
      <li v-for="(match, indexMatch) in matchsStore.matchs.x3" class="match">
        <ItemMatchMultiPlayers :match="match" />
      </li>
    </ul>

    <ul class="type-match" v-if="matchsStore.matchs.x2.length">
      <li v-for="(match, indexMatch) in matchsStore.matchs.x2" class="match">
        <ItemMatchX2Players :match="match" />
      </li>
    </ul>

    <p v-if="matchsStore.infos.nb_players <= 1 || playersSelct == false" class="msg-error-match">
      {{ content.matchs.error_players }}
    </p>
  </template>
  
</template>

<style lang="scss" scoped>
#app {
  .shuffle {
    text-align: center;
    margin-bottom: 3rem;

    &-btn {
      border: none;
      background-color: var(--green);
      padding: 1rem 1.5rem;
      border-radius: 3rem;
      font-size: 1.5rem;
      font-weight: 700;
    }
  }
  .type-match {
    margin-top: 1.5rem;
  }

  .msg-error-match {
    text-align: center;
    color: var(--red);
    font-weight: 700;
  }
  .match {
    font-size: 1.5rem;
    border-radius: $border-radius-4;
    background-color: var(--card-background-selected);
    padding: 1rem;

    &-detail {
      text-align: center;
    }

    + .match {
      margin-top: 1.5rem;
    }
  }
}
</style>