import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { name } from '../package.json';

@ApiTags('Debt-Manager')
@Controller()
export class AppController {
  @Get('/health-check')
  healthCheck(): string {
    return `Service ${name} is up and running`;
  }
}
