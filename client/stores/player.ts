import { defineStore } from 'pinia';

export const playerStore = defineStore('player',{
  state: () => ({
    player: null,
  }),
  getters: {
    getPlayer: (state) => state.player,
  },
  actions: {
    setPlayer(player) {
      this.player = player;
      console.log(player.target.getPlayerState())
    },
  },
});
