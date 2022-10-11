'use strict'

import { WordService } from "src/services/word.service";
import { wordSearch } from "src/shared/models/wordSearch";

export const updateRelated = async (word: wordSearch, wordService: WordService, searchFunction) => {
    return wordService.updateRelatedVocabs(word, searchFunction);
}