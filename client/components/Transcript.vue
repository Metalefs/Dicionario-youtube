<script lang="ts">
import { transcriptionStore } from '@/stores/transcription'
import { playerStore } from '@/stores/player';
import DefinitionToast from './DefinitionToast.vue';

export default {
    props: {
        videoId: String,
        transcription: Object,
        activeTranscriptions: Object 
    },
    components: {
        DefinitionToast
    },
    data() {
        return {
            full_transcription: [],
            canScroll: true,
            updateTranscriptions: null
        }
    },
    async mounted() {
        const { player, ...getPlayer } = playerStore()
        const { transcriptOffset } = transcriptionStore()
        console.log(player.target.getCurrentTime())

        this.updateTranscriptions = setInterval(async () => {
            this.full_transcription = this.transcription;
            const time = player?.target?.getCurrentTime() * 1000;
            this.active_transcriptions = transcriptOffset(time);
        }, 100)

        try {
            const element = document.querySelector(".lastActive");
            if (element && this.canScroll)
                element.scrollIntoView({
                    behavior: 'auto',
                    block: 'center',
                    inline: 'center'
                });

            if (!this.canScroll && player.target.getPlayerState() === 1) {
                player?.target?.pauseVideo()
            }
        } catch (ex) { }
    },
    methods: {
        isActive(text) {
            return this.activeTranscriptions?.some(t => t.text == text);
        },
        isLastActive(text) {
            return this.activeTranscriptions?.at(this.activeTranscriptions.length - 1)?.text === text;
        },
        getWords(phrase) {
            return phrase.split(" ");
        }
    },
    unmounted() {
        clearInterval(this.updateTranscriptions)
    }
}
</script>

<template>
    <div>
        <div class="transcript" @click="canScroll=false" @mouseout="canScroll=true">
            <p><em>Clique numa palavra para ler a sua definição</em></p>
            <div class="d-flex flex-wrap line" v-for="post in activeTranscriptions" :key="post.offset">
                <VDropdown v-for="(item, index) in getWords(post.text)" :key="index" :triggers="['click','focus']">
                    <span :class="{ active: isActive(post.text), lastActive: isLastActive(post.text) }">
                        {{ item }} &nbsp;
                    </span>
                    <template #popper>
                        <DefinitionToast :word="item" />
                    </template>
                </VDropdown>
            </div>
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

.active {
    background: rgb(21, 21, 21);
    font-weight: bold;
    padding: .5rem;
}

.lastActive {
    background: rgb(48, 237, 19);
    color: black;
    font-weight: bold;
    padding: .25rem;
    transition: all .5s;
    border-radius: 10px;
}

h3 {
    font-size: 1.2rem;
}

.transcript {
    outline: none;
    box-sizing: border-box;
    max-width: 480px;
    height: 375px;
    background: #181818;
    border: 1px solid grey;
    overflow-y: scroll;
    padding: 1rem;
}

@media (min-width: 1024px) {

    .greetings h1,
    .greetings h3 {
        text-align: left;
    }
}
</style>
