import { Module } from '@nestjs/common';
import { ShowtimesService } from './showtimes.service';
import { ShowtimesController } from './showtimes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Showtime } from './showtime.entity';
import { AuthModule } from '../auth/auth.module';
import { CinemasService } from 'src/cinemas/cinemas.service';
import { MoviesService } from 'src/movies/movies.service';
import { MovieRepository } from 'src/movies/movie.repository';
import { CinemaRepository } from 'src/cinemas/cinema.repository';

@Module({
  providers: [ShowtimesService],
  controllers: [ShowtimesController],
  imports: [TypeOrmModule.forFeature([Showtime]), AuthModule],
})
export class ShowtimesModule {}
