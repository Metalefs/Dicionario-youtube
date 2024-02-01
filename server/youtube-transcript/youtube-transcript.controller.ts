import { Controller, Get, Param } from '@nestjs/common';

import YoutubeTranscript from 'youtube-transcript';

@Controller()
export class YoutubeTranscriptController {
  @Get('transcript/:id')
  async get(@Param() params): Promise<any> {
    try{
      return await YoutubeTranscript['fetchTranscript'](params.id)
    }
    catch(ex){
      return [{text:'[Transcription disabled]', duration: Number.MAX_SAFE_INTEGER, offset: 0}]
    }
  }
}
