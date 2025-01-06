import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { version } from '../../package.json';
import { ConfigService } from '@nestjs/config';

export const setupSwagger = (
  app: INestApplication,
  configService: ConfigService,
) => {
  const MS_PORT = configService.get<number>('MS_PORT');
  const MS_GLOBAL_PREFIX = configService.get<string>('MS_GLOBAL_PREFIX');

  const options = new DocumentBuilder()
    .setTitle('Debt Manager')
    .setDescription('API description')
    .addBearerAuth()
    .setVersion(version)
    .addServer(`http://localhost:${MS_PORT || 3001}`, 'local')
    .addServer(`https://example.com`, 'dev')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup(`/${MS_GLOBAL_PREFIX}/api`, app, document);
};
