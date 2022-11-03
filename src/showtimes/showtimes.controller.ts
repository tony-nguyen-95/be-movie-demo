import {
  Controller,
  ForbiddenException,
  Get,
  InternalServerErrorException,
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
    try {
      if (!this.allowedRole.includes(user.role)) {
        throw new ForbiddenException();
      }
      return this.showtimeService.getShowtimes();
    } catch {
      throw new InternalServerErrorException();
    }
  }

  @Get('/:id')
  @UseGuards(AuthGuard())
  async getShowtimeById(@Param('id') id: number) {
    try {
      return this.showtimeService.getShowtimeById(id);
    } catch {
      throw new InternalServerErrorException();
    }
  }

  @Get('/:movieId/:cinemaId/list')
  async getShowtimeFromMovieAndCinema(
    @Param('movieId', ParseIntPipe) movieId: number,
    @Param('cinemaId') cinemaId: string,
  ) {
    try {
      return this.showtimeService.getShowtimeFromMovieAndCinema(
        movieId,
        cinemaId,
      );
    } catch {
      throw new InternalServerErrorException();
    }
  }
}
