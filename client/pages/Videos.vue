<script lang="ts">
import { transcriptionStore } from '../stores/transcription';
import Transcript from '../components/Transcript.vue';
import VideoContainer from '../components/VideoContainer.vue';
import { playerStore } from '../stores/player';

export default {
  components: {
    VideoContainer,
    Transcript
  },
  data() {
    return {
      updateToastersInterval: null,
      updateActiveTranscriptionsInterval: null,
      videoId: 'VQJMo2eszk0',
      transcription: {},
      activeTranscriptions: {}
    }
  },
  async mounted() {
    await this.transcribe();
    this.updateToasters();
    this.updateActiveTranscriptions();
  },
  beforeUnmount() {
    clearInterval(this.updateToasters)
  },
  methods: {
    async transcribe() {
      const { transcript } = transcriptionStore();
      this.transcription = await transcript(this.videoId);
    },
    updateToasters() {
      this.updateToastersInterval = setInterval(() => {
        const toastElList = [].slice.call(document.querySelectorAll('.toast:not(.fade)'))
        const toastList = toastElList.map(function (toastEl) {
          return new bootstrap.Toast(toastEl, { delay: 5000 })
        })
        toastList.forEach(s => s.show())
      }, 300)
    },
    updateActiveTranscriptions() {
      this.updateActiveTranscriptionsInterval = setInterval(() => {

        const { transcriptOffset } = transcriptionStore();

        const { getPlayer } = playerStore()

        const time = getPlayer?.target?.getCurrentTime() * 1000;
        this.activeTranscriptions = transcriptOffset(time);

      }, 300)
    }
  }
}
</script>

<template>
  <div class="w-100 row align-items-center justify-content-center">
    <div class="col-md-6 col-sm-12">
      <label for="videoid">Insira ID de um vídeo do youtube (ex: BnmUQrMDAAU)</label>
      <span class="p-float-label">
        <InputText @change="transcribe()" id="videoid" type="text" v-model="videoId" />
      </span>
      <VideoContainer :video-id="videoId" :active-transcriptions="activeTranscriptions" :key="videoId" />
    </div>
    <div class="px-0 col-md-1 d-sm-none">
      <Divider layout="vertical" />
    </div>
    <div class="col-md-5 col-sm-12">
      <Transcript :video-id="videoId" :transcription="transcription" :active-transcriptions="activeTranscriptions" :key="videoId"/>
    </div>
  </div>
</template>

<style scoped>

</style>
