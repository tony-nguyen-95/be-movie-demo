import { Exclude } from 'class-transformer';
import { Cineplex } from '../cineplexs/cineplex.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Showtime } from '../showtimes/showtime.entity';
import { Movie } from '../movies/movies.entity';

@Entity()
export class Cinema {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  cinemaName: string;

  @Column()
  address: string;

  @CreateDateColumn()
  updateDate;

  @ManyToOne((_type) => Cineplex, (cineplex) => cineplex.cinemas, {
    eager: false,
  })
  @Exclude({ toPlainOnly: true })
  cineplex: string;

  @OneToMany((_type) => Showtime, (showtime) => showtime.cinema, {
    eager: false,
  })
  showtimes: Showtime[];

  @ManyToMany((_type) => Movie, (movie) => movie.cinemas)
  movies: Movie[];
}
