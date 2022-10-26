import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { MovieCategory } from '../movie-category.enum';

export class UpdateMovieDto {
  @IsNotEmpty()
  @IsOptional()
  title: string;

  @IsNotEmpty()
  @IsOptional()
  scorePercent: number;

  @IsNotEmpty()
  @IsOptional()
  trailerUrl: string;

  @IsNotEmpty()
  @IsOptional()
  verticalBanner: string;

  @IsNotEmpty()
  @IsOptional()
  releaseDate: string;

  @IsNotEmpty()
  @IsOptional()
  storyAuthor: string;

  @IsNotEmpty()
  @IsOptional()
  director: string;

  @IsNotEmpty()
  @IsOptional()
  description: string;

  @IsEnum(MovieCategory)
  @IsOptional()
  category: MovieCategory;
}
