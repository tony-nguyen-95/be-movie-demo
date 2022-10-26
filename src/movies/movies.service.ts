import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { GetMoviesFilterDto } from './dto/get-movies-filter.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MovieCategory } from './movie-category.enum';
import { MovieRepository } from './movie.repository';
import { Movie } from './movies.entity';

@Injectable()
export class MoviesService {
  constructor(private movieRepository: MovieRepository) {}

  async getMoviesByIds(ids: Array<number>) {
    return await this.movieRepository.find({ where: { id: In(ids) } });
  }

  async getMovies(filterDto: GetMoviesFilterDto): Promise<Array<Movie>> {
    const query = this.movieRepository.createQueryBuilder('movie');

    const movies = await query.getMany();

    return movies;
  }

  async getMovieById(id: number): Promise<Movie> {
    const found = await this.movieRepository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(`Movie with ID "${id}" not found`);
    }

    return found;
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
