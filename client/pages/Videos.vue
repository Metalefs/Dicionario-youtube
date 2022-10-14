<script setup lang="ts">
  import IconSeparator from '../components/IconSeparator.vue';
  import Transcript from '../components/Transcript.vue';
  import VideoContainer from '../components/VideoContainer.vue';
</script>

<template>
  <div class="w-100 row align-items-center">
    <div class="col-md-6 col-sm-12">
      <VideoContainer/>
    </div>
    <div class="px-0 col-md-1 d-sm-none">
      <!-- <IconSeparator/> -->
    </div>
    <div class="col-md-5 col-sm-12">
      <Transcript/>
    </div>
  </div>
</template>


<style scoped>
</style>
