import { Test, TestingModule } from '@nestjs/testing';
import { InternetPlansController } from './internet-plans.controller';
import { InternetPlansService } from './internet-plans.service';

describe('InternetPlansController', () => {
  let controller: InternetPlansController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InternetPlansController],
      providers: [InternetPlansService],
    }).compile();

    controller = module.get<InternetPlansController>(InternetPlansController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
