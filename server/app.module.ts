import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { LexiconModule } from './lexicon.module';

@Module({
  imports: [LexiconModule,CacheModule.register({ttl: 60})],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
