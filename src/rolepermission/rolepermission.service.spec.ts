import { Test, TestingModule } from '@nestjs/testing';
import { RolepermissionService } from './rolepermission.service';

describe('RolepermissionService', () => {
  let service: RolepermissionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RolepermissionService],
    }).compile();

    service = module.get<RolepermissionService>(RolepermissionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
