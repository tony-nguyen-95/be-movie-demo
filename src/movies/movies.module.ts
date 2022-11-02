import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MoviesController } from './movies.controller';
import { Movie } from './movies.entity';
import { MoviesService } from './movies.service';
import { AuthModule } from '../auth/auth.module';
import { CinemaRepository } from 'src/cinemas/cinema.repository';
import { CinemasService } from 'src/cinemas/cinemas.service';
import { MovieRepository } from './movie.repository';

@Module({
  providers: [MoviesService, MovieRepository, CinemaRepository],
  controllers: [MoviesController],
  imports: [TypeOrmModule.forFeature([Movie]), AuthModule],
})
export class MoviesModule {}
