import { SeatTicket } from '../seat-tickets/seat-ticket.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserRole } from './user-role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  avatar: string;

  @Column()
  role: UserRole;

  @CreateDateColumn()
  updateDate;

  @OneToMany((_type) => SeatTicket, (seatTicket) => seatTicket.user, {
    eager: true,
  })
  seats: SeatTicket[];
}
