<template>
  <form>
    <label>Ajouter des nouveaux joueurs</label>
    <div
        v-for="(newPlayer, k) in newPlayers"
        :key="k"
    >
      <div>
        <input v-model="newPlayer.nom" type="text" placeholder="Nom du joueur"/>
        <!-- Add button -->
        <button @click="addField(newPlayer.nom)" v-show="(k == newPlayers.length-1)&&(newPlayer.nom != '')" type="button">+</button>

        <!-- Remove botton -->
        <button v-show="k || ( !k && newPlayers.length > 1)" @click="removeField(k)" type="button">-</button>
      </div>
    </div>
    <button @click="sendNewPlayers" type="button" v-html="texts.button.add_to_list"></button>
  </form>
</template>

<script>
import content from './../data/content.json';

export default {
  name: "addNewPlayers.vue",
  data() {
    return {
      texts: {
        "title": content.add_new_player.title,
        button: {
          add_to_list: content.button.add_to_list
        }
      },
      newPlayers: [
        { nom :'' }
      ],
    }
  },
  methods: {
    addField(player) {
      this.newPlayers.push({
        nom: player.nom
      });
    },
    removeField(index) {
      this.newPlayers.splice(index, 1);
    },
    sendNewPlayers() {
      this.$emit('addNewPlayers', this.newPlayers);

      this.newPlayers = [{ nom :'' }];
    }
  }
}
</script>

<style scoped>

</style>