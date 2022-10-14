<script setup lang="ts">
import WelcomeItem from './WelcomeItem.vue';;
import CommunityIcon from './icons/IconCommunity.vue';
import SupportIcon from './icons/IconSupport.vue';
</script>

<template>
    <WelcomeItem>
        <template #icon>
            <SupportIcon />
        </template>
        <div class="space"></div>
    </WelcomeItem>

    <WelcomeItem>
        <template #icon>
            <CommunityIcon />
        </template>
        <div class="space"></div>
    </WelcomeItem>

    <WelcomeItem>
        <template #icon>
            <SupportIcon />
        </template>
        <div class="space"></div>
    </WelcomeItem>
</template>

<style scoped>
  .space {
    min-height: 250px;
  }
</style>
