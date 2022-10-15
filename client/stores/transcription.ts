import { defineStore } from 'pinia';
import { APIURL } from '../constants';
export const transcriptionStore = defineStore('transcription', ()=>{
  const transcription = []
 
  async function transcript(id) {
    try {
      const response = await fetch(window.location.origin+"/transcript/"+id);
      const json = await response.json();
      this.transcription = json;
      return json;
    } catch (error) {
      console.log(error);
    }
  }

  function transcriptOffset(offset) {
    return this.transcription.filter(t=>(t.offset - 100) <= offset).filter(t=> offset <= ((t.offset + 300)+ t.duration)) ?? [];
  }
  return { transcription, transcript, transcriptOffset }
});
