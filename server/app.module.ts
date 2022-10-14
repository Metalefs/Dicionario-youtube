import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { LexiconModule } from './lexicon.module';

@Module({
  imports: [LexiconModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
