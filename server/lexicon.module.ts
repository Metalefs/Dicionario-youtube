import { Module } from '@nestjs/common';
import { LexiconController } from './lexicon.controller';
import { LexiconService } from './lexicon.service';
import { YoutubeTranscriptController } from './youtube-transcript/youtube-transcript.controller';

@Module({
  imports: [],
  controllers: [LexiconController, YoutubeTranscriptController],
  providers: [LexiconService],
})
export class LexiconModule {}
