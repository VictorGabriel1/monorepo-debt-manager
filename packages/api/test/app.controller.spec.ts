import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from 'src/app.controller';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();

    appController = module.get<AppController>(AppController);
  });

  it('should be defined', () => {
    expect(appController).toBeDefined();
  });

  it('should return "Service @api is up and running" on health-check', () => {
    const result = appController.healthCheck();
    expect(result).toBe('Service @api is up and running');
  });
});
