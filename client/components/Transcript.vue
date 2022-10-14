<script lang="ts">
import { transcriptionStore } from '@/stores/transcription'
import { playerStore } from '@/stores/player';

export default {
    data() {
        return {
            active_transcriptions: [],
            full_transcription: []
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
                        setInterval(() => {
                            this.full_transcription = transcription;
                            const time = args[0]?.target?.getCurrentTime() * 1000;
                            this.active_transcriptions = transcriptOffset(time);
                            const element = document.querySelector(".active");
                            element.scrollIntoView({
                                behavior: 'auto',
                                block: 'center',
                                inline: 'center'
                            });
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
            return this.active_transcriptions.at(0).text === text;
        },
        isLastActive(text) {
            return this.active_transcriptions.at(this.active_transcriptions.length-1).text === text;
        }
    }
}
</script>

<template>
    <div class="transcript">
        <p v-for="post in full_transcription" :key="post.offset">
            <span :class="{ active: isActive(post.text), lastActive: isLastActive(post.text) }">{{ post.text }}</span>
        </p>
    </div>
</template>

<style scoped>
h1 {
    font-weight: 500;
    font-size: 2.6rem;
    top: -10px;
}

span.active {
    background: rgb(21, 21, 21);
    font-weight: bold;
    padding: .5rem;
}
span.lastActive {
    background: rgb(48, 237, 19);
    color: black;
    font-weight: bold;
    padding: .5rem;
    
    transition: all .5s;
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
