'use strict'

import * as WorkerPool from 'workerpool'
import * as Tasks from '../tasks/'

import { WordService } from "server/services/word.service";
import { wordSearch } from "server/shared/models/wordSearch";

// MIDDLEWARE FUNCTIONS
const updateRelated = (word: wordSearch, wordService: WordService, searchFunction) => {
  return Tasks.updateRelated(word, wordService, searchFunction)
}

// CREATE WORKERS
WorkerPool.worker({
  updateRelated
})