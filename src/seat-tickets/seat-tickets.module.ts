import { Module } from '@nestjs/common';
import { SeatTicketsService } from './seat-tickets.service';
import { SeatTicketsController } from './seat-tickets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeatTicket } from './seat-ticket.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [SeatTicketsService],
  controllers: [SeatTicketsController],
  imports: [TypeOrmModule.forFeature([SeatTicket]), AuthModule],
})
export class SeatTicketsModule {}
