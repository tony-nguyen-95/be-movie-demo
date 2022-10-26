import { Cinema } from '../cinemas/cinema.entity';
import { Showtime } from '../showtimes/showtime.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MovieCategory } from './movie-category.enum';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title!: string;

  @Column()
  trailerUrl: string;

  @Column()
  verticalBanner: string;

  @Column()
  releaseDate: string;

  @Column()
  storyAuthor: string;

  @Column()
  director: string;

  @Column({
    length: 5000,
  })
  description: string;

  @Column()
  scorePercent: number;

  @Column()
  category!: MovieCategory;

  @CreateDateColumn()
  updateDate;

  @OneToMany((_type) => Showtime, (showtime) => showtime.movie, {
    eager: true,
  })
  showtimes: Showtime[];

  @ManyToMany((_type) => Cinema, (cinema) => cinema.movies)
  @JoinTable()
  cinemas: Cinema[];
}
