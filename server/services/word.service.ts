import { Db } from "mongodb";
import { Scraper } from "server/shared/interfaces/scraper";
import { wordSearch } from "server/shared/models/wordSearch";
import { BaseService } from "../shared/models/base.service";

export class WordService extends BaseService{
    constructor(protected dbconnection: Db) {
        super(dbconnection, "word");
    }

    async updateRelatedVocabs(wordSearch: wordSearch, navigator: Scraper[]) {
        const allWords = [wordSearch.antonynms,wordSearch.synonyms,wordSearch.related].flat();       

        for (const word of allWords) {
            console.log(word?.name ?? word)
            await this.tryUpdateLexicon(word, navigator)
        }

        wordSearch.isRelatedLoaded = true;
        this.update({ name: wordSearch.name }, wordSearch)
    }
    
    async tryUpdateLexicon(word: any, navigator: Scraper[]) {
        if(!word)
            return;
        const inDictionary = await this.findByName(word?.name || word) as any
        if (!inDictionary) {
            const wordResult = await navigator[0].getDefinition(word.name);
            console.log('updating: ' + wordResult.name || 'not found');
            if (wordResult?.name)
                this.update({ name: wordResult.name }, wordResult)
        }
    }
}