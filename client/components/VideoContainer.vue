<script lang="ts">
import { playerStore } from '@/stores/player'
import { transcriptionStore } from '@/stores/transcription'
import DefinitionToast from './DefinitionToast.vue';

export default {
  components: {
    DefinitionToast
  },
  data() {
    return {
      active_transcriptions: []
    }
  },
  methods: {
    getVideoTitle() {
      const { getPlayer } = playerStore()
      return getPlayer?.target?.videoTitle ?? ''
    },
    activePhrases() {
      return this.active_transcriptions
    },
    transcriptToasters(player) {
      const { transcriptOffset } = transcriptionStore();
    
      transcriptionStore().$onAction(
            ({
                name,
                store,
                args,
                after,
                onError,
            }) => {
              after(async (result) => 
              {
                    if (name == 'transcript' && args) {
                        setInterval(() => {
                            this.full_transcription = result;
                            const time = player?.target?.getCurrentTime() * 1000;
                            this.active_transcriptions = transcriptOffset(time);
                            this.hasActiveTranscription = !!this.hasActiveTranscription;
                        }, 100)
                    }
                })
            }
        )
    },
  },
  mounted() {
    const { setPlayer } = playerStore();
    this.transcriptToasters = this.transcriptToasters.bind(this);
    const player = new YT.Player('ytplayer', {
      events: {
        'onStateChange': (event) => { setPlayer(event); 
        this.transcriptToasters(event)}
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

@media (min-width: 1024px) {

  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
