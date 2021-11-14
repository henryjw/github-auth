import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// TODO: read from environment variable
const PORT = 3001;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: (requestOrigin) => {
      // TODO: disable this in non-development environments
      if (requestOrigin.startsWith('http://localhost')) {
        return true;
      }

      return false;
    },
  });

  await app.listen(PORT);
}

(async () => {
  try {
    await bootstrap();
    console.log(`Listening on port: ${PORT}`);
  } catch (err) {
    console.error('Error starting up', err);
    process.exit(1);
  }
})();
