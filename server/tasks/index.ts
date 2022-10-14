'use strict'

import { WordService } from "server/services/word.service";
import { wordSearch } from "server/shared/models/wordSearch";

export const updateRelated = async (word: wordSearch, wordService: WordService, searchFunction) => {
    return wordService.updateRelatedVocabs(word, searchFunction);
}