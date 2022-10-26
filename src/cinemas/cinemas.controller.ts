import { Body, Controller, Logger, Post } from '@nestjs/common';
import { MoviesService } from 'src/movies/movies.service';
import { Cinema } from './cinema.entity';
import { CinemasService } from './cinemas.service';
import { CreateCinemaDto } from './dto/create-cinema.dto';

@Controller('cinemas')
export class CinemasController {
  private logger = new Logger('CinemasController');

  constructor(
    private cinemasService: CinemasService,
    private moviesService: MoviesService,
  ) {}

  @Post()
  async createCinema(
    @Body() createCinemaDto: CreateCinemaDto,
  ): Promise<Cinema> {
    const movies = await this.moviesService.getMoviesByIds(
      createCinemaDto.movieIds,
    );
    return this.cinemasService.createCinema(createCinemaDto, movies);
  }
}
