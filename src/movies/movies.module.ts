import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MoviesController } from './movies.controller';
import { Movie } from './movies.entity';
import { MoviesService } from './movies.service';
import { AuthModule } from '../auth/auth.module';
import { MovieRepository } from './movie.repository';

@Module({
  controllers: [MoviesController],
  providers: [MoviesService, MovieRepository],
  imports: [TypeOrmModule.forFeature([Movie]), AuthModule],
})
export class MoviesModule {}
