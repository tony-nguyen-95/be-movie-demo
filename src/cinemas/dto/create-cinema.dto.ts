import { IsArray, IsNotEmpty } from 'class-validator';

export class CreateCinemaDto {
  @IsNotEmpty()
  cinemaName: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  cineplex: string;

  @IsNotEmpty()
  @IsArray()
  movieIds: Array<number>;
}
