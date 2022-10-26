import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from 'src/movies/movies.entity';
import { In, Repository } from 'typeorm';
import { Cinema } from './cinema.entity';
import { CreateCinemaDto } from './dto/create-cinema.dto';

@Injectable()
export class CinemasService {
  constructor(
    @InjectRepository(Cinema) private cinemaRepository: Repository<Cinema>, // @InjectRepository(Movie) // private movieRepository: Repository<Movie>,
  ) {}

  async getCinemas(): // filterDto: GetCinemasFilterDto
  Promise<Array<Cinema>> {
    const query = this.cinemaRepository.createQueryBuilder('Cinema');

    const Cinemas = await query.getMany();

    return Cinemas;
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

    const Cinema = await this.cinemaRepository.create({
      cinemaName,
      address,
      cineplex,
      movies,
    });

    await this.cinemaRepository.save(Cinema);

    return Cinema;
  }

  async deleteCinema(id: string): Promise<void> {
    const result = await this.cinemaRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`Cinema with ID "${id}" not found`);
    }
  }
}
