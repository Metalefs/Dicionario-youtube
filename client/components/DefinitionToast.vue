<script lang="ts">
import { dictionaryStore } from '@/stores/dictionary';
import DraggableDiv from './Draggable.vue';
export default {
    components: {
        DraggableDiv
    },
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
        if (this.phrase)
            this.def_phrase = await definePhrase(this.phrase || '');
        if (this.word)
            this.definition = await defineWord(this.word || '');


    }
}
</script>

<template>
    <DraggableDiv v-if="this.def_phrase">
        <template #main>
            <div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header">
                    <div class="rounded me-2"></div>
                    <strong class="me-auto">{{this.phrase}}</strong>
                    <small>{{new Date().toLocaleTimeString()}}</small>
                </div>
                <div class="toast-body">
                    <p>{{this.def_phrase}}</p>
                </div>
            </div>
        </template>
    </DraggableDiv>
    <div v-if="this.word" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header">
            <div class="rounded me-2"></div>
            <strong class="me-auto">Tradução</strong>
            <small>{{new Date().toLocaleTimeString()}}</small>
            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="px-2">
            <div class="toast-body">
                <p>{{this.definition?.definitions?.at(0) ?? this.definition?.name ??
                this.word}}
                </p>
            </div>
        </div>
    </div>
</template>


<style scoped>
p {
    color: black;
}

.toast-body p {
    color: black;

}
</style>