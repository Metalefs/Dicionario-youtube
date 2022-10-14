<script lang="ts">
import { dictionaryStore } from '@/stores/dictionary';

export default {
    components: {
    },
    data() {
        return {
            canScroll: true,
            input: '',
            output: '',
        }
    },
    async mounted() {

    },
    methods: {
        getWords(phrase) {
            return phrase.split(" ");
        },
        async callAPI(){
            const { definePhrase } = dictionaryStore();
            this.output = await definePhrase(this.input || '');
        }
    }
}
</script>

<template>
    <div class="row">
        <div class="col-md-6 col-sm-12">
            <p>Insira algo que gostaria de dizer de outra forma</p>
            <Textarea v-model="input" :autoResize="true" rows="5" cols="30" />
        </div>
        <div class="col-md-6 col-sm-12">
            <p>Sugiro tentar algo do tipo:</p>
            <div contenteditable disabled>{{output}}</div>
        </div>
        <div class="col-12">
            <Button label="Eufemizar" icon="pi pi-check" @click="callAPI()"/>
        </div> 
    </div>
</template>

<style scoped>
h1 {
    font-weight: 500;
    font-size: 2.6rem;
    top: -10px;
}

span {
    cursor: pointer;
}

.line {
    padding: .5rem;
    border-bottom: 1px solid rgba(128, 128, 128, 0.009);
}

.line:focus {
    background: rgb(48, 237, 19);
    color: black;
    font-weight: bold;
}

h3 {
    font-size: 1.2rem;
}

@media (min-width: 1024px) {

    .greetings h1,
    .greetings h3 {
        text-align: left;
    }
}
</style>
