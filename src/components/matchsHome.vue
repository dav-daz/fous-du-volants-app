<script setup>
  import content from '@/data/content.json';

  import { storeToRefs } from 'pinia';
  import { useMatchsStore } from "@/store/matchs";
  const matchsStore = useMatchsStore();
  let playersSelct = true;

  if(window.localStorage.getItem('players')){
    matchsStore.init(JSON.parse(window.localStorage.getItem('players')).playersSelected);
  }else{
    playersSelct = false;
  }

  function start() {
    matchsStore.init(JSON.parse(window.localStorage.getItem('players')).playersSelected);
  }
</script>

<template>
  <p v-if="matchsStore.infos.nb_players > 1" class="shuffle">
    <button type="button" @click="start" class="shuffle-btn">
      {{ content.button.melanger_matchs }}
    </button>
  </p>

  <ul class="type-match" v-if="matchsStore.matchs.x4.length">
    <li v-for="(match, indexMatch) in matchsStore.matchs.x4" class="match">
      <!--<div class="match-head">Match {{ matchsStore.matchNumber }}</div>-->
      <div class="match-detail">
          <template v-for="(team, indexTeam) in match">
            <p class="match-team">
              <template v-for="(player, indexPlayer) in team">
                <span v-if="indexPlayer === 1"> et </span>
                {{ player }}
              </template>
            </p>
            <p v-if="indexTeam === 0" class="vs-sep">contre</p>
          </template>
        </div>
    </li>
  </ul>

  <ul class="type-match" v-if="matchsStore.matchs.x5.length">
    <li v-for="(match, indexMatch) in matchsStore.matchs.x5" class="match">
      <!--<div class="match-head">Match {{ matchsStore.matchNumber }}</div>-->
      <div class="match-detail">
        <p class="match-team">
            <template v-for="(player, playerIndex) in match">
              {{ player }}<template v-if="playerIndex != match.length -1">, </template>
            </template>
          </p>
      </div>
    </li>
  </ul>

  <ul class="type-match" v-if="matchsStore.matchs.x3.length">
    <li v-for="(match, indexMatch) in matchsStore.matchs.x3" class="match">
      <!--<div class="match-head">Match {{ matchsStore.matchNumber }}</div>-->
      <div class="match-detail">
        <p class="match-team">
          <template v-for="(player, playerIndex) in match">
            {{ player }}<template v-if="playerIndex != match.length -1">, </template>
          </template>
        </p>
      </div>
    </li>
  </ul>

  <ul class="type-match" v-if="matchsStore.matchs.x2.length">
    <li v-for="(match, indexMatch) in matchsStore.matchs.x2" class="match">
      <!--<div class="match-head">Match {{ matchsStore.matchNumber }}</div>-->
      <div class="match-detail">
        <p class="match-team">
            <template v-for="(player, playerIndex) in match">
              {{ player }}<template v-if="playerIndex != match.length -1"> contre </template>
            </template>
          </p>
      </div>
    </li>
  </ul>

  <p v-if="matchsStore.infos.nb_players <= 1 || playersSelct == false" class="msg-error-match">
    {{ content.matchs.error_players }}
  </p>
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

  .vs-sep {
    margin: 10px 0;
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