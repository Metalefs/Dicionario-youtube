<script lang="ts">
import { dictionaryStore } from '@/stores/dictionary';

export default {
    props: {
        phrase: String
    },
    data() {
        return {
            definition: '',
        }
    },
    async mounted() {
        const { definePhrase } = dictionaryStore();
        console.log(this.phrase)
        this.definition = await definePhrase(this.phrase || '');
    }
}
</script>

<template>
    <div class="px-2">
        <p>{{this.definition}}</p>
    </div>
</template>

