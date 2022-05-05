import { Test, TestingModule } from '@nestjs/testing';
import { JemaatController } from './jemaat.controller';
import { JemaatService } from './jemaat.service';

describe('JemaatController', () => {
  let controller: JemaatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JemaatController],
      providers: [JemaatService],
    }).compile();

    controller = module.get<JemaatController>(JemaatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
