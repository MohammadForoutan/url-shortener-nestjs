import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { envConfig } from './infra';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: envConfig.CORS_ORIGINS,
    methods: envConfig.CORS_METHODS,
    allowedHeaders: envConfig.CORS_ALLOWED_HEADERS,
    maxAge: envConfig.CORS_MAX_AGE,
  });

  app.enableVersioning();
  app.setGlobalPrefix('api');

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('URL Shortener')
    .setDescription('URL Shortener API')
    .addBearerAuth()
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, swaggerDocument);

  const HOST = envConfig.HOST;
  const PORT = envConfig.PORT;

  await app.listen(PORT, HOST, () => {
    Logger.log(`Server is running on http://${HOST}:${PORT}. 🚀`);
    Logger.log(`Swagger is running on http://${HOST}:${PORT}/api/docs. 📚`);
  });
}
bootstrap();
