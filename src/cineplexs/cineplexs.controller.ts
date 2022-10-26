import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Cineplex } from './cineplex.entity';
import { CineplexsService } from './cineplexs.service';
import { CreateCineplexDto } from './dto/create-cineplex.dto';

@Controller('cineplexs')
export class CineplexsController {
  private logger = new Logger('CineplexsController');

  constructor(private cineplexsService: CineplexsService) {}

  @Get()
  getCineplexs(): Promise<Array<Cineplex>> {
    return this.cineplexsService.getAllCineplexs();
  }

  @Get('/:id')
  getCineplexById(@Param('id') id: string): Promise<Cineplex> {
    return this.cineplexsService.getCineplexById(id);
  }

  @Post()
  createMovie(@Body() createCineplexDto: CreateCineplexDto): Promise<Cineplex> {
    return this.cineplexsService.createCineplex(createCineplexDto);
  }

  @Delete('/:id')
  deleteMovie(@Param('id') id: string): Promise<void> {
    return this.cineplexsService.deleteCineplex(id);
  }

  @Patch('/:id')
  updateMovie(
    @Param('id') id: string,
    @Body() updateCineplexDto: CreateCineplexDto,
  ): Promise<Cineplex> {
    return this.cineplexsService.updateCineplex(id, updateCineplexDto);
  }
}
