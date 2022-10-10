import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { wordSearch } from './shared/models/wordSearch';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('word/:word')
  getWord(@Param() params): Promise<wordSearch> {
    return this.appService.getWord(params.word);
  }

  @Get('phrase/:phrase')
  getPhrase(@Param() params): Promise<string> {
    return this.appService.getPhrase(params.phrase);
  }
}
