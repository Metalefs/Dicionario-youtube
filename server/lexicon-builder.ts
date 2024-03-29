import { Db, MongoClient } from "mongodb"
//import { Browser, launch } from "puppeteer-core"
import { dbconnection } from "./database"
import { getRandomWord } from "./helper/lexicon-helper"
import { WordService } from "./services/word.service"
import { wordSearch } from "./shared/models/wordSearch"
import { Navigator } from "./shared/navigator"
//import { isProduction } from "./utils/env"

export class LexiconBuilder {
    //browser:Browser;
    db:Db;
    con:MongoClient;
    navigator:Navigator;
    wordService:WordService

    constructor(){
        this.buildLexicon = this.buildLexicon.bind(this);
        this.buildLexiconFromInput = this.buildLexiconFromInput.bind(this);
    }

    async prepare(){
        [this.db, this.con] = await dbconnection() as any;
        this.wordService = new WordService(this.db); 
        //if (!isProduction) {
            //this.browser = await launch();
            this.navigator = new Navigator(/*this.browser*/);
        //}
    }

    unmount(){
        //if(this.browser)
            //this.browser.close();
        (this.con as MongoClient).close();
    }

    buildLexicon = async (word: string) => {
        word = word.toLocaleLowerCase();
        let wordSearch = await this.wordService.findByName(word) as any;
        if (wordSearch) return wordSearch;
        else {
            //if (!isProduction) {
                wordSearch = await this.navigator.searchDicioInformal(word);
                if (!wordSearch) { return word }
                wordSearch.isRelatedLoaded = false;
                this.wordService.update({ name: wordSearch.name }, wordSearch);
                return wordSearch as wordSearch;
            //}
        }
    }

    builLexiconAndReturnWordDefinition = async (word: string) => {
        const definition = await this.buildLexicon(word);
        
        if(!definition.isRelatedLoaded)
            await this.wordService.updateRelatedVocabs(definition, this.navigator.scrapers)
        return definition;
    }
    
    returnWordDefinition = async (word: string) => {
        return this.buildLexicon(word);
    }
    
    buildLexiconAndFormPhrase = async (phrase: string, config = { randomize: true }) => {
        const words = this.parseInput(phrase);
        const newPhrase = [];

        for (const word of words) {
            let result;
            if (this.willSearch(word)) {
                const wordResult = await this.buildLexicon(word);
                if (config.randomize)
                    result = getRandomWord(wordResult, word)
            }
            else {
                result = word;
            }
            newPhrase.push(newPhrase.length > 0 ? result.toLowerCase() : result)
        }

        return newPhrase.join(' ');
    }

    buildLexiconFromInput = async (input: string) => {
        const words = this.parseInput(input); 
        for (const word of words) {
            if (this.willSearch(word)) {
                await this.builLexiconAndReturnWordDefinition(word)
            }
        }
    }

    private willSearch = (word:string) => word.length > 3 || word.includes('ú') || word.includes('u');
    private parseInput = (input:string) => input.split(' ').map(word => word.replace(',', '').replace('.', '').replace(':', ''));
}
