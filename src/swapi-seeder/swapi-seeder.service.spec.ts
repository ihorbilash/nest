import { Test, TestingModule } from '@nestjs/testing';
import { SwapiSeederService } from './swapi-seeder.service';

describe('SwapiSeederService', () => {
  let service: SwapiSeederService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SwapiSeederService],
    }).compile();

    service = module.get<SwapiSeederService>(SwapiSeederService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
