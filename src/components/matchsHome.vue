<script setup>
  import { ref, computed } from 'vue';
  import content from '@/data/content.json';

  import { useSupabasePlayerStore } from '@/store/SupabasePlayerStore.js';
  const supabasePlayerStore = useSupabasePlayerStore();

  import { useMatchsStore } from "@/store/matchs.js";
  const matchsStore = useMatchsStore();

  import ItemSelectNumberTerrains from '@/components/items/ItemSelectNumberTerrains.vue';
  import ItemMatchMultiPlayers from '@/components/items/ItemMatchMultiPlayers.vue';
  import ItemMatchX2Players from '@/components/items/ItemMatchX2Players.vue';
  import ItemMatchX4Players from '@/components/items/ItemMatchX4Players.vue';

  let playersSelct = true;

  const playersSelected = computed(() => supabasePlayerStore.getPlayersSelected);

  if(playersSelected.value.length){
    const infos = matchsStore.infosMatchs(playersSelected.value);

    if (!infos.distribution_failed) {
      matchsStore.init(playersSelected.value);
    }
  }else{
    playersSelct = false;
  }

  function start() {
    matchsStore.init(playersSelected.value);
  }
</script>

<template>
  <ItemSelectNumberTerrains />

  <p v-if="matchsStore.errorMessage" v-html="matchsStore.errorMessage" class="msg-error-match"></p>
  
  <template v-else>
    <div v-if="playersSelected.length > 1" class="shuffle">
      <button type="button" @click="start" class="shuffle-btn">
        {{ content.button.melanger_matchs }}
      </button>

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
    </div>

    <p v-if="playersSelected.length <= 1 || playersSelct == false" class="msg-error-match">
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