import { Cinema } from '../cinemas/cinema.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Cineplex {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  cineplexName: string;

  @Column()
  logo: string;

  @CreateDateColumn()
  updateDate;

  @OneToMany((_type) => Cinema, (cinema) => cinema.cineplex, { eager: true })
  cinemas: Cinema[];
}
