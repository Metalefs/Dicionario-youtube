import { NestFactory } from '@nestjs/core';
import * as compression from 'compression';
import { AppModule } from './app.module';
import { getViteServer } from './get-vite-server';
import { isProduction } from './utils/env';
import { resolveDistPath } from './utils/resolve-path';

import type { NestExpressApplication } from '@nestjs/platform-express';
import { dbconnection } from './database';
import { PurgeStaticFilesScheduler } from './routines/purgeStaticFiles';
import * as Worker from './pool/controller';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  new PurgeStaticFilesScheduler(((await dbconnection())[2] as any)).start()
  
  if (process.env.WORKER_POOL_ENABLED === '1') {
    const options = { minWorkers: 'max' }
    await Worker.init(options)
  }

  if (isProduction) {
    app.useStaticAssets(resolveDistPath('client'), {
      index: false,
    });
    app.use(compression());
  } else {
    const vite = await getViteServer();
    app.use(vite.middlewares);
  }

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
