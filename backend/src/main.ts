import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = process.env.PORT || 8081;
  if (!port) {
    // This is the cleanest way to fail if the environment is misconfigured.
    throw new Error(
      'PORT environment variable is required and must be defined.',
    );
  }

  await app.listen(port);
}
bootstrap();
