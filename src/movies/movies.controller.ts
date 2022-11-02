import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { GetMoviesFilterDto } from './dto/get-movies-filter.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './movies.entity';
import { MoviesService } from './movies.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../users/user.entity';
import { UserRole } from '../users/user-role.enum';
import { Cinema } from 'src/cinemas/cinema.entity';

@Controller('movies')
export class MoviesController {
  private logger = new Logger('MoviesController');

  private allowedRole: Array<UserRole> = [UserRole.ADMIN, UserRole.SUPER_ADMIN];

  constructor(private moviesService: MoviesService) {}

  @Get()
  async getMovies(
    @Query() filterDto: GetMoviesFilterDto,
  ): Promise<Array<Movie>> {
    return this.moviesService.getMovies(filterDto);
  }

  @Get('/:id')
  async getMovieById(@Param('id', ParseIntPipe) id: number): Promise<Movie> {
    return this.moviesService.getMovieById(id);
  }

  @Get('/cinemas/:id')
  async getCinemasFromMovieId(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Cinema[]> {
    return this.moviesService.getCinemasFromMovieId(id);
  }

  @Post()
  @UseGuards(AuthGuard())
  createMovie(
    @Body() createMovieDto: CreateMovieDto,
    @GetUser() user: User,
  ): Promise<Movie> {
    if (!this.allowedRole.includes(user.role)) {
      throw new ForbiddenException();
    }

    this.logger.verbose(
      `User "${user.username}" creating a new movie. Data: ${JSON.stringify(
        createMovieDto,
      )}`,
    );

    return this.moviesService.createMovie(createMovieDto);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  deleteMovie(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    if (!this.allowedRole.includes(user.role)) {
      throw new ForbiddenException();
    }

    this.logger.verbose(
      `User "${user.username}" deleting a movie with ID ${id}.`,
    );

    return this.moviesService.deleteMovie(id);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard())
  updateMovie(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMovieDto: UpdateMovieDto,
    @GetUser() user: User,
  ): Promise<Movie> {
    if (!this.allowedRole.includes(user.role)) {
      throw new ForbiddenException();
    }

    return this.moviesService.updateMovie(id, updateMovieDto);
  }
}
