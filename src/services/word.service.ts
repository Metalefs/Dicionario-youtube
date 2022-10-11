import { Db } from "mongodb";
import { wordSearch } from "src/shared/models/wordSearch";
import { BaseService } from "../shared/models/base.service";

export class WordService extends BaseService{
    constructor(protected dbconnection: Db) {
        super(dbconnection, "word");
    }

    async updateRelatedVocabs(wordSearch: wordSearch, searchFunction: (name) => Promise<wordSearch>) {
        const allWords = [wordSearch.antonynms,wordSearch.synonyms,wordSearch.related].flat();       

        for (const word of allWords) {
            await this.tryUpdateLexicon(word, searchFunction)
        }

        wordSearch.isRelatedLoaded = true;
        this.update({ name: wordSearch.name }, wordSearch)
    }

    
    async tryUpdateLexicon(word: any, searchFunction: (name) => Promise<wordSearch>) {
        const inDictionary = await this.findByName(word.name) as any
        if (!inDictionary) {
            const wordResult = await searchFunction(word.name)
            console.log('updating: ' + wordResult.name || 'not found');
            if (wordResult?.name)
                this.update({ name: wordResult.name }, word)
        }
    }
}