<script lang="ts">
import { dictionaryStore } from '@/stores/dictionary';

export default {
    components: {
    },
    data() {
        return {
            canScroll: true,
            input: '',
            output: null,
            loading: false,
        }
    },
    async mounted() {

    },
    methods: {
        getWords(phrase) {
            return phrase.split(" ");
        },
        async callAPI() {
            const { buildWord } = dictionaryStore();
            this.loading = true;
            this.output = await buildWord(this.input || '');
            this.loading = false;
        }
    }
}
</script>

<template>
    <main class="w-100">
        <div class="w-100d-flex flex-row align-items-end justify-content-center">
            <label for="word">Insira uma palavra para ter uma visão melhor dela</label>
            <span class="p-float-label">
                <InputText @change="callAPI()" id="word" type="text" v-model="input"/>
            </span>
            <Divider></Divider>
            <Card>
                <template #content>
                    <i :v-if="loading" class="pi pi-loading"></i>
                    <div v-if="output?.definitions">
                        <p><span>{{output?.definitions[0] ?? ''}}</span></p>
                    </div>
                    <div v-if="output?.examples">{{output?.examples[0] ?? ''}}</div>
                </template>
            </Card>
        </div>
        <div>
            <Divider></Divider>
            <h3>Relacionados</h3>
            <div v-for="related of output?.related" :key="related.name">
                <a href="#" @click="input=related.name;callAPI()">{{related.name ?? ''}}</a>
            </div>
        </div>
    </main>
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
