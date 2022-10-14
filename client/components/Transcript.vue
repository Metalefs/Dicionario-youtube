<script lang="ts">
import { transcriptionStore } from '@/stores/transcription'
import { playerStore } from '@/stores/player';
import DefineAsync from './DefineAsync.vue';
import { dictionaryStore } from '@/stores/dictionary';

export default {
    components: {
        DefineAsync
    },
    data() {
        return {
            hasActiveTranscription: false,
            active_transcriptions: [],
            full_transcription: [],
            canScroll: true,
        }
    },
    async mounted() {
        const { player, ...getPlayer } = playerStore()
        playerStore().$onAction(
            ({
                name, // name of the action
                store, // store instance, same as `someStore`
                args, // array of parameters passed to the action
                after, // hook after the action returns or resolves
                onError, // hook if the action throws or rejects
            }) => {
                // a shared variable for this specific action call
                const startTime = Date.now()
                // this will trigger before an action on `store` is executed
                console.log(`Start "${name}".`)

                // this will trigger if the action succeeds and after it has fully run.
                // it waits for any returned promised
                after(async (result) => {
                    if (name == 'setPlayer' && args) {
                        const { transcript } = transcriptionStore()
                        console.log(args[0].target.getCurrentTime())

                        //setInterval(()=>{setPlayer(player)}, 100);
                        const id = args[0].target.playerInfo.videoData.video_id;
                        await transcript(id);
                        const { transcriptOffset, transcription } = transcriptionStore()
                        const { definePhrase } = dictionaryStore();
                        setInterval(() => {
                            this.full_transcription = transcription;
                            const time = args[0]?.target?.getCurrentTime() * 1000;
                            this.active_transcriptions = transcriptOffset(time);
                            this.hasActiveTranscription = !!this.hasActiveTranscription;
                            try{
                                const element = document.querySelector(".active");
                                if(element && this.canScroll)
                                element.scrollIntoView({
                                    behavior: 'auto',
                                    block: 'center',
                                    inline: 'center'
                                });
                                if(!this.canScroll && player.target.getPlayerState() === 1){
                                    args[0]?.target?.pauseVideo()
                                }
                                else if(player.target.getPlayerState() === 2){
                                    args[0]?.target?.playVideo()
                                }
                            }catch(ex){}
                        }, 100)
                    }
                })

                // this will trigger if the action throws or returns a promise that rejects
                onError((error) => {
                    console.warn(
                        `Failed "${name}" after ${Date.now() - startTime}ms.\nError: ${error}.`
                    )
                })
            }
        )
    },
    methods: {
        isActive(text) {
            return this.active_transcriptions?.at(0)?.text === text;
        },
        isLastActive(text) {
            return this.active_transcriptions?.at(this.active_transcriptions.length-1)?.text === text;
        },
        getWords(phrase){
            return phrase.split(" ");
        },
        activePhrase(){
            return this.active_transcriptions?.at(this.active_transcriptions.length-1)?.text
        }
    }
}
</script>

<template>
    <div>
        <div class="transcript" @mousedown="canScroll=false" @mouseout="canScroll=true">
            <div class="d-flex flex-wrap line" v-for="post in active_transcriptions" :key="post.offset">
                <VDropdown v-for="(item, index) in getWords(post.text)" :key="index" :triggers="['click','focus']">      
                    <span :class="{ active: isActive(post.text), lastActive: isLastActive(post.text) }">
                        {{ item }} &nbsp;
                    </span>
                    <template #popper>
                        <DefineAsync :word="item"/>
                    </template>
                </VDropdown>
            </div>
        </div>
        <div>
            <DefineAsync v-if="activePhrase()" :phrase="activePhrase()" :key="activePhrase()"/>
        </div>
    </div>
</template>

<style scoped>
h1 {
    font-weight: 500;
    font-size: 2.6rem;
    top: -10px;
}
span{
    cursor:pointer;
}
.line{
    padding: .5rem;
    border-bottom:1px solid rgba(128, 128, 128, 0.009);
}
.line:focus{
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
    min-width: 480px;
    height: 642px;
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
