import { IsEnum, IsOptional, IsString } from 'class-validator';
import { MovieCategory } from '../movie-category.enum';

export class GetMoviesFilterDto {
  @IsOptional()
  @IsEnum(MovieCategory)
  category?: MovieCategory;

  @IsOptional()
  @IsString()
  search?: string;
}
