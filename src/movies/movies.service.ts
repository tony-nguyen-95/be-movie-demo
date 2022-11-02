import { Injectable, NotFoundException } from '@nestjs/common';
import { Cinema } from 'src/cinemas/cinema.entity';
import { CinemaRepository } from 'src/cinemas/cinema.repository';
import { Showtime } from 'src/showtimes/showtime.entity';
import { In } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { GetMoviesFilterDto } from './dto/get-movies-filter.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MovieRepository } from './movie.repository';
import { Movie } from './movies.entity';

@Injectable()
export class MoviesService {
  constructor(
    private movieRepository: MovieRepository,
    private cinemaRepository: CinemaRepository,
  ) {}

  async getMovies(filterDto: GetMoviesFilterDto): Promise<Array<Movie>> {
    const { search } = filterDto;

    const query = this.movieRepository.createQueryBuilder('movie');

    if (search) {
      query.andWhere(
        '(LOWER(movie.title) LIKE LOWER(:search) OR LOWER(movie.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }

    const movies = await await query.getMany();

    return movies;
  }

  async getMovieById(id: number): Promise<Movie> {
    const movie = this.movieRepository.findOne({ where: { id } });

    return movie;
  }

  async getMoviesByIds(ids: Array<number>) {
    return await this.movieRepository.find({
      where: { id: In(ids) },
    });
  }

  async getMoviesByIdsIncludeShowtime(ids: Array<number>) {
    return await this.movieRepository.find({
      where: { id: In(ids) },
      relations: { showtimes: true },
    });
  }

  async getCinemasFromMovieId(movieId: number): Promise<Array<Cinema>> {
    const queryArrayCinemaIds = await this.movieRepository.query(`
    SELECT cinemaId
    FROM movie
    INNER JOIN movie_cinemas_cinema
    ON movie.id = movie_cinemas_cinema.movieId where movie_cinemas_cinema.movieId like "%${movieId}%";`);

    if ((await queryArrayCinemaIds.length) === 0) {
      throw new NotFoundException(`Movie with ID "${movieId}" not found`);
    }

    const cinemas = await this.cinemaRepository.find({
      where: { id: In(queryArrayCinemaIds.map((item) => item.cinemaId)) },
    });

    return cinemas;
  }

  async createMovie(createMovieDto: CreateMovieDto): Promise<Movie> {
    const {
      title,
      trailerUrl,
      verticalBanner,
      releaseDate,
      storyAuthor,
      director,
      description,
      category,
    } = createMovieDto;

    const movie = this.movieRepository.create({
      title,
      trailerUrl,
      verticalBanner,
      releaseDate,
      storyAuthor,
      director,
      description,
      category,
    });

    await this.movieRepository.save(movie);
    return movie;
  }

  async deleteMovie(id: number): Promise<void> {
    const result = await this.movieRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`Movie with ID "${id}" not found`);
    }
  }

  async updateMovie(
    id: number,
    updateMovieDto: UpdateMovieDto,
  ): Promise<Movie> {
    const {
      title,
      trailerUrl,
      verticalBanner,
      releaseDate,
      storyAuthor,
      director,
      description,
      category,
    } = updateMovieDto;
    let movie = await this.getMovieById(id);

    movie = {
      ...movie,
      title,
      trailerUrl,
      verticalBanner,
      releaseDate,
      storyAuthor,
      director,
      description,
      category,
    };

    await this.movieRepository.save(movie);

    delete movie.id;

    return movie;
  }
}
