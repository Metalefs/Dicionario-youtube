import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { dbconnection } from './database';
import { PurgeStaticFilesScheduler } from './routines/purgeStaticFiles';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  new PurgeStaticFilesScheduler((await dbconnection()[0] as any)).start()
  await app.listen(3000);
}
bootstrap();
