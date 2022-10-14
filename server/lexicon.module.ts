import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LexiconController } from './lexicon.controller';
import { LexiconService } from './lexicon.service';
import { YoutubeTranscriptController } from './youtube-transcript/youtube-transcript.controller';

@Module({
  imports: [CacheModule.register({ttl: 0})],
  controllers: [LexiconController, YoutubeTranscriptController],
  providers: [
    LexiconService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class LexiconModule {}
