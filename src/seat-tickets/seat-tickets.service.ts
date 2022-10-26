import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SeatTicket } from './seat-ticket.entity';

@Injectable()
export class SeatTicketsService {
  constructor(
    @InjectRepository(SeatTicket)
    private userRepository: Repository<SeatTicket>,
  ) {}
}
