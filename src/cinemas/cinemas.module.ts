import { forwardRef, Module } from '@nestjs/common';
import { CinemasService } from './cinemas.service';
import { CinemasController } from './cinemas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cinema } from './cinema.entity';
import { AuthModule } from '../auth/auth.module';
import { MoviesService } from '../movies/movies.service';
import { MovieRepository } from 'src/movies/movie.repository';
import { CinemaRepository } from './cinema.repository';
import { MoviesModule } from 'src/movies/movies.module';

@Module({
  providers: [CinemasService, MovieRepository, MoviesService, CinemaRepository],
  controllers: [CinemasController],
  imports: [TypeOrmModule.forFeature([Cinema]), AuthModule],
  exports: [CinemasService, CinemaRepository],
})
export class CinemasModule {}
