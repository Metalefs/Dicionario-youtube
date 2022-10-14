<script setup lang="ts">
  import IconSeparator from './IconSeparator.vue';
  import Transcript from './Transcript.vue';
</script>

<template>
  <div class="w-100 row align-items-center justify-content-center">
    <div class="col-1">
      <IconSeparator/>
    </div>
    <div class="col-11">
      <Transcript/>
    </div>
  </div>
</template>


<style scoped>
.w-100{
  max-width: 100vw;
}
</style>
