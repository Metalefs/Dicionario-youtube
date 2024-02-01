<script lang="ts">
import { playerStore } from '@/stores/player'
import DefinitionToast from './DefinitionToast.vue';

export default {
  props: {
    videoId: String,
    transcription: Object,
    activeTranscriptions: Object
  },
  components: {
    DefinitionToast
  },
  methods: {
    getVideoTitle() {
      const { getPlayer } = playerStore()
      return getPlayer?.target?.videoTitle ?? ''
    },
    activePhrases() {
      return this.activeTranscriptions
    },
  },
  mounted() {
    const { setPlayer } = playerStore();
    new YT.Player('ytplayer', {
      events: {
        'onStateChange': (event) => {
          setPlayer(event);
        }
      },
      height: '360',
      ///width: window.innerWidth - 90,
      videoId: this.videoId,
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
    <div class="toast-container">
      <DefinitionToast v-for="phrase in activePhrases()" :phrase="phrase.text" :key="phrase.text" />
    </div>
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
.toast-container{
  background: #faebd766;
}
@media (min-width: 1024px) {

  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
