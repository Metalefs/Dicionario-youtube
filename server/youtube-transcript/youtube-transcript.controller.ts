import { Controller, Get, Param } from '@nestjs/common';

import YoutubeTranscript from 'youtube-transcript';

@Controller()
export class YoutubeTranscriptController {
  @Get('transcript/:id')
  async get(@Param() params): Promise<any> {
    return await YoutubeTranscript.fetchTranscript(params.id)
  }
}
