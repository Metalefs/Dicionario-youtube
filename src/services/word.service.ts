import { Db } from "mongodb";
import { wordSearch } from "src/shared/models/wordSearch";
import { BaseService } from "../shared/models/base.service";

export class WordService extends BaseService{
    constructor(protected dbconnection: Db) {
        super(dbconnection, "word");
    }

    async updateRelatedVocabs(wordSearch: any, searchFunction: (name) => Promise<wordSearch>) {
        for (const word of wordSearch.antonynms) {
            await this.tryUpdateLexicon(word, searchFunction)
        }
    
        for (const word of wordSearch.synonyms) {
            await this.tryUpdateLexicon(word, searchFunction)
        }
    
        for (const word of wordSearch.related) {
            await this.tryUpdateLexicon(word, searchFunction)
        }
    }

    
    async tryUpdateLexicon(word: any, searchFunction: (name) => Promise<wordSearch>) {
        const inDictionary = await this.findByName(word.name) as any
        if (!inDictionary) {
            const wordResult = await searchFunction(word.name)
            console.log('updating: ' + wordResult.name || 'not found');
            if (wordResult?.name)
                word.update({ name: word.wordResult }, word)
        }
    }
}