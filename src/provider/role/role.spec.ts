import { Test, TestingModule } from '@nestjs/testing';
import { Role } from './role';

describe('Role', () => {
  let provider: Role;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Role],
    }).compile();

    provider = module.get<Role>(Role);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
