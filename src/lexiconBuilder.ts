import { Db } from "mongodb"
import { launch } from "puppeteer-core"
import { dbconnection } from "./database"
import { WordService } from "./services/word.service"
import { wordSearch } from "./shared/models/wordSearch"
import { Navigator } from "./shared/navigator"

export const buildLexicon = async (db, word: string, config = {update:true, closeBrowser: true}, browser?) => {
    const wordService = new WordService(db as unknown as Db);
    let wordSearch = await wordService.findByName(word) as any;
    if(wordSearch)
        return wordSearch;
    else {
        browser = browser ?? await launch();
        const navigator = new Navigator(browser);    
        wordSearch = await navigator.searchDicioInformal(word);
        if(!wordSearch){return word}
        insertWord(wordSearch);

        if(config.update){
            for (const word of wordSearch.antonynms) {
                await tryUpdateLexicon(wordService, word, navigator, insertWord)
            }

            for (const word of wordSearch.synonyms) {
                await tryUpdateLexicon(wordService, word, navigator, insertWord)
            }

            for (const word of wordSearch.related) {
                await tryUpdateLexicon(wordService, word, navigator, insertWord)
            }
        }

        function insertWord(wordResult) {
            console.log('updating: '+wordResult.name || 'not found');
            if(wordResult?.name)
                wordService.update({ name: wordResult.name }, wordResult)
        }

        if(config.closeBrowser)
            browser.close();

        return wordSearch as wordSearch;
    }
}

export const loadLexiconFromWord = async (word: string) => {
    const [db] = await dbconnection();
    return buildLexicon(db, word)
}

export const loadLexiconFromPhrase = async (phrase: string) => {
    const words = phrase.split(' '); //.replace(/[^\w ]/g, '')
    const newPhrase = [];
    const [db] = await dbconnection();
    const browser = await launch();
    let idx = 0;
    for (const word of words) {
        let result;
        if(word.length > 3){
            const f_word = word.replace(',','').replace('.','').replace(':','');
            const wordResult = (await buildLexicon(db, f_word, {update: false, closeBrowser: false}, browser));
            const definition = /\d/.test(wordResult?.definition) ? wordResult.name : wordResult?.definition;
            result = (wordResult?.synonyms[getRandomInt(0, wordResult?.synonyms?.length - 1)]?.name || definition || wordResult?.name || wordResult);
            result = result.replace('.','')

            if(word.endsWith(',') || word.endsWith(':') || word.endsWith('.')){
                result = result + word[word.length -1];
            }
        }
        else {
            result = word;
        }
        newPhrase.push(idx > 0 ? result.toLowerCase() : result)
        idx++;
    }
    return newPhrase.join(' ');
}

async function tryUpdateLexicon(wordService: WordService, word: any, navigator: Navigator, insertWord: (wordResult: any) => void) {
    const inDictionary = await wordService.findByName(word.name) as any
    if (!inDictionary) {
        const antonym = await navigator.searchDicioInformal(word.name)
        insertWord(antonym)
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}