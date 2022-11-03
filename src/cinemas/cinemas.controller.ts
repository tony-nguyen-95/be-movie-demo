import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  InternalServerErrorException,
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
    try {
      return await this.cinemasService.getMoviesFromCinemaId(id);
    } catch {
      throw new InternalServerErrorException();
    }
  }

  @Get('/movies/:id/showtime')
  async getMoviesFromCinemaIdIncludeShowtimes(@Param('id') id: string) {
    try {
      return await this.cinemasService.getMoviesFromCinemaIdIncludeShowtime(id);
    } catch {
      throw new InternalServerErrorException();
    }
  }

  @Get()
  async getAllCinemas() {
    try {
      return this.cinemasService.getAllCinemas();
    } catch {
      throw new InternalServerErrorException();
    }
  }

  @Post()
  @UseGuards(AuthGuard())
  async createCinema(
    @Body() createCinemaDto: CreateCinemaDto,
    @GetUser() user: User,
  ): Promise<Cinema> {
    try {
      if (!this.allowedRole.includes(user.role)) {
        throw new ForbiddenException();
      }

      const movies = await this.moviesService.getMoviesByIds(
        createCinemaDto.movieIds,
      );
      return this.cinemasService.createCinema(createCinemaDto, movies);
    } catch {
      throw new InternalServerErrorException();
    }
  }
}
