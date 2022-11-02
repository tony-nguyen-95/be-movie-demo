import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Showtime } from './showtime.entity';

@Injectable()
export class ShowtimesService {
  constructor(
    @InjectRepository(Showtime)
    private showtimeRepository: Repository<Showtime>,
  ) {}
  async getShowtimes(): Promise<Showtime[]> {
    const queryShowtimes = await this.showtimeRepository.createQueryBuilder(
      'showtime',
    );
    const showtime = await queryShowtimes.getMany();
    return showtime;
  }

  async getShowtimeById(id: number): Promise<Showtime> {
    const queryShowtime = await this.showtimeRepository.findOne({
      where: { id },
      relations: { seats: true },
    });

    return queryShowtime;
  }

  async getShowtimeFromMovieAndCinema(
    movieId: number,
    cinemaId: string,
  ): Promise<Array<Showtime>> {
    const queryArrayShowtime = await this.showtimeRepository.query(`
    SELECT * FROM showtime
    where (cinemaId like "%${cinemaId}%") and (movieId like "%${movieId}%");`);

    return queryArrayShowtime;
  }
}
