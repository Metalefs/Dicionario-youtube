import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { dbconnection } from './database';
import { PurgeStaticFilesScheduler } from './routines/purgeStaticFiles';
import * as Worker from './pool/controller';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  new PurgeStaticFilesScheduler((await dbconnection()[0] as any)).start()
  
  if (process.env.WORKER_POOL_ENABLED === '1') {
    const options = { minWorkers: 'max' }
    await Worker.init(options)
  }

  await app.listen(3000);
}
bootstrap();
