import { Exclude } from 'class-transformer';
import { Showtime } from '../showtimes/showtime.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { SeatPosition } from './seat-position.enum';
import { SeatStatus } from './seat-status.enum';
import { User } from '../users/user.entity';

@Entity()
export class SeatTicket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  seatPosition: SeatPosition;

  @Column()
  seatStatus: SeatStatus;

  @ManyToOne((_type) => Showtime, (showtime) => showtime.seats, {
    eager: false,
  })
  @Exclude({ toPlainOnly: true })
  showtime: number;

  @ManyToOne((_type) => User, (user) => user.seats, {
    eager: false,
  })
  user: string;
}
