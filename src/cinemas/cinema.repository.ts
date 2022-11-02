import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Cinema } from './cinema.entity';

@Injectable()
export class CinemaRepository extends Repository<Cinema> {
  constructor(private dataSource: DataSource) {
    super(Cinema, dataSource.createEntityManager());
  }
}
