import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  InternalServerErrorException,
  Logger,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { UserRole } from 'src/users/user-role.enum';
import { User } from 'src/users/user.entity';
import { Cineplex } from './cineplex.entity';
import { CineplexsService } from './cineplexs.service';
import { CreateCineplexDto } from './dto/create-cineplex.dto';

@Controller('cineplexs')
export class CineplexsController {
  private logger = new Logger('CineplexsController');

  private allowedRole: Array<UserRole> = [UserRole.ADMIN, UserRole.SUPER_ADMIN];

  constructor(private cineplexsService: CineplexsService) {}

  @Get()
  getCineplexs(): Promise<Array<Cineplex>> {
    try {
      return this.cineplexsService.getAllCineplexs();
    } catch {
      throw new InternalServerErrorException();
    }
  }

  @Get('/:id')
  getCineplexById(@Param('id') id: string): Promise<Cineplex> {
    try {
      return this.cineplexsService.getCineplexById(id);
    } catch {
      throw new InternalServerErrorException();
    }
  }

  @Post()
  @UseGuards(AuthGuard())
  createCineplex(
    @Body() createCineplexDto: CreateCineplexDto,
    @GetUser() user: User,
  ): Promise<Cineplex> {
    try {
      if (!this.allowedRole.includes(user.role)) {
        throw new ForbiddenException();
      }
      return this.cineplexsService.createCineplex(createCineplexDto);
    } catch {
      throw new InternalServerErrorException();
    }
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  deleteCineplex(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<void> {
    try {
      if (!this.allowedRole.includes(user.role)) {
        throw new ForbiddenException();
      }

      return this.cineplexsService.deleteCineplex(id);
    } catch {
      throw new InternalServerErrorException();
    }
  }

  @Patch('/:id')
  @UseGuards(AuthGuard())
  updateCineplex(
    @Param('id') id: string,
    @Body() updateCineplexDto: CreateCineplexDto,
    @GetUser() user: User,
  ): Promise<Cineplex> {
    try {
      if (!this.allowedRole.includes(user.role)) {
        throw new ForbiddenException();
      }

      return this.cineplexsService.updateCineplex(id, updateCineplexDto);
    } catch {
      throw new InternalServerErrorException();
    }
  }
}
