import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from 'src/movies/movies.entity';
import { MoviesService } from 'src/movies/movies.service';
import { In } from 'typeorm';
import { Cinema } from './cinema.entity';
import { CinemaRepository } from './cinema.repository';
import { CreateCinemaDto } from './dto/create-cinema.dto';

@Injectable()
export class CinemasService {
  constructor(
    private cinemaRepository: CinemaRepository,
    private moviesService: MoviesService,
  ) {}

  async getAllCinemas(): Promise<Array<Cinema>> {
    const query = this.cinemaRepository.createQueryBuilder('cinema');
    const cinemas = query.getMany();

    return cinemas;
  }

  async getMoviesFromCinemaId(cinemaId: string): Promise<Array<Movie>> {
    const queryArrayMovieIds = await this.cinemaRepository.query(`
    SELECT movieId
    FROM cinema
    INNER JOIN movie_cinemas_cinema
    ON cinema.id = movie_cinemas_cinema.cinemaId where movie_cinemas_cinema.cinemaId like "%${cinemaId}%";`);

    if ((await queryArrayMovieIds.length) === 0) {
      throw new NotFoundException(`Cinema with ID "${cinemaId}" not found`);
    }

    const movies = await this.moviesService.getMoviesByIds(
      queryArrayMovieIds.map((item) => item.movieId),
    );

    return movies;
  }

  async getMoviesFromCinemaIdIncludeShowtime(
    cinemaId: string,
  ): Promise<Array<Movie>> {
    const queryArrayMovieIds = await this.cinemaRepository.query(`
    SELECT movieId
    FROM cinema
    INNER JOIN movie_cinemas_cinema
    ON cinema.id = movie_cinemas_cinema.cinemaId where movie_cinemas_cinema.cinemaId like "%${cinemaId}%";`);

    if ((await queryArrayMovieIds.length) === 0) {
      throw new NotFoundException(`Cinema with ID "${cinemaId}" not found`);
    }

    const movies = await this.moviesService.getMoviesByIdsIncludeShowtime(
      queryArrayMovieIds.map((item) => item.movieId),
    );

    return movies;
  }

  async getCinemaById(id: string): Promise<Cinema> {
    const found = await this.cinemaRepository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(`Cinema with ID "${id}" not found`);
    }

    return found;
  }

  async createCinema(
    createCinemaDto: CreateCinemaDto,
    movies: Array<Movie>,
  ): Promise<Cinema> {
    const { cinemaName, address, cineplex } = createCinemaDto;

    const cinema = await this.cinemaRepository.create({
      cinemaName,
      address,
      cineplex,
      movies,
    });

    await this.cinemaRepository.save(cinema);

    return cinema;
  }

  async deleteCinema(id: string): Promise<void> {
    const result = await this.cinemaRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`Cinema with ID "${id}" not found`);
    }
  }

  async updateCinemaWithMovies(
    id: string,
    movieIds: Array<number>,
  ): Promise<Cinema> {
    let cinema = await this.getCinemaById(id);

    const movies = await this.moviesService.getMoviesByIds(movieIds);

    cinema = {
      ...cinema,
      movies: movies,
    };

    await this.cinemaRepository.save(cinema);

    return cinema;
  }
}
