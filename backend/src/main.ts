import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  const port = process.env.PORT || 3000;
  if (!port) {
    // This is the cleanest way to fail if the environment is misconfigured.
    throw new Error(
      'PORT environment variable is required and must be defined.',
    );
  }

  await app.listen(port);
}
bootstrap();
