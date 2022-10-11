'use strict'

import * as WorkerPool from 'workerpool'
import * as Tasks from '../tasks/'

import { WordService } from "src/services/word.service";
import { wordSearch } from "src/shared/models/wordSearch";

// MIDDLEWARE FUNCTIONS
const updateRelated = (word: wordSearch, wordService: WordService, searchFunction) => {
  return Tasks.updateRelated(word, wordService, searchFunction)
}

// CREATE WORKERS
WorkerPool.worker({
  updateRelated
})