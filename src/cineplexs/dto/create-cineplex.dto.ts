import { IsArray, IsNotEmpty } from 'class-validator';

export class CreateCineplexDto {
  @IsNotEmpty()
  cineplexName: string;

  @IsNotEmpty()
  logo: string;
}
