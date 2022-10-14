<script lang="ts">
import { dictionaryStore } from '@/stores/dictionary';

export default {
    props: {
        phrase: String,
        word: String
    },
    data() {
        return {
            def_phrase: '',
            definition: '',
        }
    },
    async mounted() {
        const { definePhrase, defineWord } = dictionaryStore();
        console.log(this.phrase, this.word)
        if(this.phrase)
        this.def_phrase = await definePhrase(this.phrase || '');
        if(this.word)
        this.definition = await defineWord(this.word || '');
    }
}
</script>

<template>
    <div class="px-2">
        <p v-if="this.def_phrase">{{this.def_phrase}}</p>
        <p v-if="this.definition">{{this.definition?.definitions?.at(0) ?? this.definition?.name ?? this.word}}</p>
    </div>
</template>

