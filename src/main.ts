import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// TODO: read from environment variable
const PORT = 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
