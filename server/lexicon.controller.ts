import { Controller, Get, Param } from '@nestjs/common';
import { LexiconService } from './lexicon.service';
import { wordSearch } from './shared/models/wordSearch';

@Controller()
export class LexiconController {
  constructor(private readonly LexiconService: LexiconService) {}

  @Get('word/:word')
  getWord(@Param() params): Promise<wordSearch> {
    return this.LexiconService.getWord(params.word);
  }

  @Get('phrase/:phrase')
  getPhrase(@Param() params): Promise<string> {
    return this.LexiconService.getPhrase(params.phrase);
  }
}
