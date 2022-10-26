import { Module } from '@nestjs/common';
import { ShowtimesService } from './showtimes.service';
import { ShowtimesController } from './showtimes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Showtime } from './showtime.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [ShowtimesService],
  controllers: [ShowtimesController],
  imports: [TypeOrmModule.forFeature([Showtime]), AuthModule],
})
export class ShowtimesModule {}
