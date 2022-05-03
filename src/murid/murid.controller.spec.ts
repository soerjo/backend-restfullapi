import { Test, TestingModule } from '@nestjs/testing';
import { MuridController } from './murid.controller';
import { MuridService } from './murid.service';

describe('MuridController', () => {
  let controller: MuridController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MuridController],
      providers: [MuridService],
    }).compile();

    controller = module.get<MuridController>(MuridController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
