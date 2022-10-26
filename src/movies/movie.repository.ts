import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Movie } from './movies.entity';

@Injectable()
export class MovieRepository extends Repository<Movie> {
  constructor(private dataSource: DataSource) {
    super(Movie, dataSource.createEntityManager());
  }
}
