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
            const { definePhrase } = dictionaryStore();
            this.loading = true;
            this.output = await definePhrase(this.input || '');
            this.loading = false;
        }
    }
}
</script>

<template>
    <main class="w-100">
        <div class="row align-items-end justify-content-center w-100">
            <div class="col-md-12 col-sm-12">
                <p>Insira algo que gostaria de dizer de outra forma</p>
                <div class="field col-12 md:col-4">
                    <span class="p-float-label">
                        <label for="textarea">Insira algo</label>
                        <Textarea class="w-100" @change="callAPI()" v-model="input" :autoResize="true" id="textarea"
                            rows="3" />                        
                    </span>
                </div>
            </div>
            <div class="col-md-12 col-sm-12">
                <Divider type="dashed"></Divider>
                <h6>Tente algo como:</h6>
                <Card>
                    <template #content>
                        <em v-if="loading" class="pi pi-spin pi-spinner" style="font-size: 2rem"></em>

                        <div class="field col-12 md:col-4">
                            <p>{{output}}</p>
                            <span class="p-float-label">
                                <label for="textarea2">*O site prioriza palavras com mais de três letras</label>
                            </span>
                        </div>
                    </template>
                </Card>
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
