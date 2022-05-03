import { Test, TestingModule } from '@nestjs/testing';
import { BaptisService } from './baptis.service';

describe('BaptisService', () => {
  let service: BaptisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BaptisService],
    }).compile();

    service = module.get<BaptisService>(BaptisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
