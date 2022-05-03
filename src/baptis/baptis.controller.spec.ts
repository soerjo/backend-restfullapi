import { Test, TestingModule } from '@nestjs/testing';
import { BaptisController } from './baptis.controller';
import { BaptisService } from './baptis.service';

describe('BaptisController', () => {
  let controller: BaptisController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BaptisController],
      providers: [BaptisService],
    }).compile();

    controller = module.get<BaptisController>(BaptisController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
