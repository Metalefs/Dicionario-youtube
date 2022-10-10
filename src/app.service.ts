import { Injectable } from '@nestjs/common';
import { loadLexiconFromWord, loadLexiconFromPhrase } from './lexiconBuilder';
import { wordSearch } from './shared/models/wordSearch';

@Injectable()
export class AppService {
  async getWord(word): Promise<wordSearch> {
    return loadLexiconFromWord(word);
  }

  async getPhrase(word): Promise<string> {
    return loadLexiconFromPhrase(word);
  }
}
