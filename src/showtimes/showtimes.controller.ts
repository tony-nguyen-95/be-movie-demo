import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { UserRole } from 'src/users/user-role.enum';
import { User } from 'src/users/user.entity';
import { ShowtimesService } from './showtimes.service';

@Controller('showtimes')
export class ShowtimesController {
  private allowedRole: Array<UserRole> = [UserRole.ADMIN, UserRole.SUPER_ADMIN];

  constructor(private showtimeService: ShowtimesService) {}

  @Get('/all')
  @UseGuards(AuthGuard())
  async getShowtimes(@GetUser() user: User) {
    if (!this.allowedRole.includes(user.role)) {
      throw new ForbiddenException();
    }
    return this.showtimeService.getShowtimes();
  }

  @Get('/:id')
  @UseGuards(AuthGuard())
  async getShowtimeById(@Param('id') id: number) {
    return this.showtimeService.getShowtimeById(id);
  }

  @Get('/:movieId/:cinemaId/list')
  async getShowtimeFromMovieAndCinema(
    @Param('movieId', ParseIntPipe) movieId: number,
    @Param('cinemaId') cinemaId: string,
  ) {
    return this.showtimeService.getShowtimeFromMovieAndCinema(
      movieId,
      cinemaId,
    );
  }
}
