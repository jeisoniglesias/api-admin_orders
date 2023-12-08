import { Test, TestingModule } from '@nestjs/testing';
import { InternetRatesController } from './internet-rates.controller';
import { InternetRatesService } from './internet-rates.service';

describe('InternetRatesController', () => {
  let controller: InternetRatesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InternetRatesController],
      providers: [InternetRatesService],
    }).compile();

    controller = module.get<InternetRatesController>(InternetRatesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
