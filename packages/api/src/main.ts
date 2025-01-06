import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './config/swagger.config';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const configService = app.get(ConfigService);

  const MS_GLOBAL_PREFIX = configService.get<string>('MS_GLOBAL_PREFIX')!;
  const MS_PORT = configService.get<string>('MS_PORT')!;
  const NODE_ENV = configService.get<string>('NODE_ENV')!;

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      enableDebugMessages: true,
    }),
  );

  app.setGlobalPrefix(`${MS_GLOBAL_PREFIX || 'debt-manager'}`);

  if (NODE_ENV !== 'prd') {
    setupSwagger(app, configService);
  }

  await app.listen(MS_PORT || 3001);
}
bootstrap();
