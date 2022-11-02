import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { SeatStatus } from './seat-status.enum';
import { SeatTicket } from './seat-ticket.entity';

@Injectable()
export class SeatTicketsService {
  constructor(
    @InjectRepository(SeatTicket)
    private ticketRepository: Repository<SeatTicket>,
  ) {}
  async getTicketById(id: string): Promise<SeatTicket> {
    const queryTicket = await this.ticketRepository.findOne({
      where: { id },
    });

    return queryTicket;
  }

  async bookTicket(arrayIds: Array<string>, userId: string) {
    await this.ticketRepository
      .createQueryBuilder('booking')
      .update(SeatTicket)
      .set({ seatStatus: SeatStatus.BOOKED, user: userId })
      .where({ id: In(arrayIds) })
      .execute();

    return arrayIds;
  }
}
