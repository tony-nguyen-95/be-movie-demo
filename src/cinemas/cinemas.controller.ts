import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Logger,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { MoviesService } from 'src/movies/movies.service';
import { UserRole } from 'src/users/user-role.enum';
import { User } from 'src/users/user.entity';
import { Cinema } from './cinema.entity';
import { CinemasService } from './cinemas.service';
import { CreateCinemaDto } from './dto/create-cinema.dto';

@Controller('cinemas')
export class CinemasController {
  private logger = new Logger('CinemasController');

  private allowedRole: Array<UserRole> = [UserRole.ADMIN, UserRole.SUPER_ADMIN];

  constructor(
    private cinemasService: CinemasService,
    private moviesService: MoviesService,
  ) {}

  @Get('/movies/:id')
  async getMoviesFromCinemaId(@Param('id') id: string) {
    return await this.cinemasService.getMoviesFromCinemaId(id);
  }

  @Get('/movies/:id/showtime')
  async getMoviesFromCinemaIdIncludeShowtimes(@Param('id') id: string) {
    return await this.cinemasService.getMoviesFromCinemaIdIncludeShowtime(id);
  }

  @Get()
  async getAllCinemas() {
    return this.cinemasService.getAllCinemas();
  }

  @Post()
  @UseGuards(AuthGuard())
  async createCinema(
    @Body() createCinemaDto: CreateCinemaDto,
    @GetUser() user: User,
  ): Promise<Cinema> {
    if (!this.allowedRole.includes(user.role)) {
      throw new ForbiddenException();
    }

    const movies = await this.moviesService.getMoviesByIds(
      createCinemaDto.movieIds,
    );
    return this.cinemasService.createCinema(createCinemaDto, movies);
  }
}
