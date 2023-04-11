import { forwardRef, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { User } from './users.entity';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService,ConfigService],
  controllers: [],
  imports: [
    forwardRef(()=>AuthModule),
    TypeOrmModule.forFeature([User])
  ],
  exports: [UsersService]
})
export class UsersModule { }
