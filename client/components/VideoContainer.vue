<script lang="ts">
 import { playerStore } from '@/stores/player'
 
 export default {
   methods: {
     getVideoTitle() {
       const { getPlayer } = playerStore()
       return getPlayer?.target?.videoTitle ?? ''
      }
    },
    mounted() {
      const { setPlayer } = playerStore()
      new YT.Player('ytplayer', {
        events: {
          'onStateChange': (event) => { setPlayer(event) }
        },
        height: '360',
        ///width: window.innerWidth - 90,
        videoId: 'BnmUQrMDAAU',
        origin: window.location.origin,
        showinfo: 1,
        enablejsapi: 1,
        playerVars: {
          'autoplay': 1,
          'controls': 0,
          'autohide': 1,
          'fs': 0,
          'wmode': 'opaque',        
        },
      })
  }
}
</script>

<template>
  <div class="greetings">
    <span>Video: {{ getVideoTitle() }}</span>

    <div class="video" id="ytplayer"></div>
  </div>
</template>

<style scoped>

.video {
  aspect-ratio: 16 / 9;
  width: 100%;
}

h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {

  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
