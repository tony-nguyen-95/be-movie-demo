import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/users/user.entity';
import { SeatTicketsService } from './seat-tickets.service';

@Controller('seat-tickets')
@UseGuards(AuthGuard())
export class SeatTicketsController {
  constructor(private seatTicketService: SeatTicketsService) {}

  @Get('/:id')
  async getTicketById(@Param('id') id: string) {
    try {
      return this.seatTicketService.getTicketById(id);
    } catch {
      throw new InternalServerErrorException();
    }
  }

  @Patch('/booking')
  async bookTicket(
    @Body() listTicketIds: Array<string>,
    @GetUser() user: User,
  ) {
    try {
      return this.seatTicketService.bookTicket(listTicketIds, user.id);
    } catch {
      throw new InternalServerErrorException();
    }
  }
}
