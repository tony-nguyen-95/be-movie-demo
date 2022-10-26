import { Exclude } from 'class-transformer';
import { Cinema } from '../cinemas/cinema.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Movie } from '../movies/movies.entity';
import { SeatTicket } from '../seat-tickets/seat-ticket.entity';

@Entity()
export class Showtime {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  showDate: string;

  @Column({ type: 'date' })
  showTime: string;

  @CreateDateColumn()
  updateDate;

  @ManyToOne((_type) => Cinema, (cinema) => cinema.showtimes, {
    eager: false,
  })
  @Exclude({ toPlainOnly: true })
  cinema: string;

  @ManyToOne((_type) => Movie, (movie) => movie.showtimes, {
    eager: false,
  })
  @Exclude({ toPlainOnly: true })
  movie: number;

  @OneToMany((_type) => SeatTicket, (seatTicket) => seatTicket.showtime, {
    eager: true,
  })
  seats: SeatTicket[];
}
