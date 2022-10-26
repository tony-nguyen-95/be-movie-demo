import { Module } from '@nestjs/common';
import { CinemasService } from './cinemas.service';
import { CinemasController } from './cinemas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cinema } from './cinema.entity';
import { AuthModule } from '../auth/auth.module';
import { MoviesModule } from '../movies/movies.module';
import { MoviesService } from '../movies/movies.service';
import { MovieRepository } from 'src/movies/movie.repository';

@Module({
  providers: [CinemasService, MovieRepository, MoviesService],
  controllers: [CinemasController],
  imports: [TypeOrmModule.forFeature([Cinema]), AuthModule],
})
export class CinemasModule {}
