import { Test, TestingModule } from '@nestjs/testing';
import { InternetRatesService } from './internet-rates.service';

describe('InternetRatesService', () => {
  let service: InternetRatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InternetRatesService],
    }).compile();

    service = module.get<InternetRatesService>(InternetRatesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
