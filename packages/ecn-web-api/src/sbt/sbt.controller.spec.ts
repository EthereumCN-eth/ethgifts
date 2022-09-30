import { Test, TestingModule } from '@nestjs/testing';
import { SbtController } from './sbt.controller';
import { SbtService } from './sbt.service';

describe('SbtController', () => {
  let controller: SbtController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SbtController],
      providers: [SbtService],
    }).compile();

    controller = module.get<SbtController>(SbtController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
