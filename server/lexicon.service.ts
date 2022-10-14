import { Injectable } from '@nestjs/common';
import { LexiconBuilder } from './lexicon-builder';
import { wordSearch } from './shared/models/wordSearch';


@Injectable()
export class LexiconService {
  lexiconBuilder: LexiconBuilder;
  
  constructor() {
    this.lexiconBuilder = new LexiconBuilder();
    this.lexiconBuilder.prepare();
  }

  async buildWord(word): Promise<wordSearch> {    
    return this.lexiconBuilder.builLexiconAndReturnWordDefinition(word);
  }

  async getWordDefinition(word): Promise<wordSearch> {    
    return this.lexiconBuilder.returnWordDefinition(word);
  }

  async getPhrase(word): Promise<string> {
    return this.lexiconBuilder.buildLexiconAndFormPhrase(word);
  }
}
