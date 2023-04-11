import { Module } from '@nestjs/common';
import { SwapiSeederService } from './swapi-seeder.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports:[HttpModule],
  providers: [SwapiSeederService]
})
export class SwapiSeederModule {}
