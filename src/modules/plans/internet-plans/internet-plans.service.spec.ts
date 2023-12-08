import { Test, TestingModule } from '@nestjs/testing';
import { InternetPlansService } from './internet-plans.service';

describe('InternetPlansService', () => {
  let service: InternetPlansService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InternetPlansService],
    }).compile();

    service = module.get<InternetPlansService>(InternetPlansService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
