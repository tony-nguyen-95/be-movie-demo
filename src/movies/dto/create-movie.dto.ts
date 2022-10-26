import { IsEnum, IsNotEmpty } from 'class-validator';
import { MovieCategory } from '../movie-category.enum';

export class CreateMovieDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  trailerUrl: string;

  @IsNotEmpty()
  verticalBanner: string;

  @IsNotEmpty()
  releaseDate: string;

  @IsNotEmpty()
  storyAuthor: string;

  @IsNotEmpty()
  director: string;

  @IsNotEmpty()
  description: string;

  @IsEnum(MovieCategory)
  category: MovieCategory;
}
