import { Test, TestingModule } from '@nestjs/testing';
import { RolepermissionController } from './rolepermission.controller';

describe('RolepermissionController', () => {
  let controller: RolepermissionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RolepermissionController],
    }).compile();

    controller = module.get<RolepermissionController>(RolepermissionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
