import { IsEnum, IsOptional, IsString } from 'class-validator';
import { MovieCategory } from '../movie-category.enum';

export class GetMoviesFilterDto {
  @IsOptional()
  @IsString()
  search?: string;
}
