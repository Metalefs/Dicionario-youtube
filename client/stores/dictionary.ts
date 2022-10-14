import { defineStore } from 'pinia';

export const dictionaryStore = defineStore('dictionary', ()=>{
  const definition = []
  const word = []
 
  async function definePhrase(phrase) {
    try {
      const response = await fetch("http://localhost:3000/phrase/"+phrase);
      
      this.definition = await response.text();
      return this.definition;
    } catch (error) {
      console.log(error);
    }
  }
  async function defineWord(word) {
    try {
      const response = await fetch("http://localhost:3000/word/"+word);
      
      this.word = await response.json();
      return this.word;
    } catch (error) {
      console.log(error);
    }
  }

  return { definition, definePhrase, defineWord }
});
