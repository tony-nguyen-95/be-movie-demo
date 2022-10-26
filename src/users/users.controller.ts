import {
  Controller,
  ForbiddenException,
  Get,
  Logger,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { GetUsersFilterDto } from './dto/get-users-filter.dto';
import { UserRole } from './user-role.enum';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  private logger = new Logger('UserController');

  private readonly allowedRole: Array<UserRole> = [
    UserRole.ADMIN,
    UserRole.SUPER_ADMIN,
  ];

  constructor(private usersService: UsersService) {}

  @Get('/all')
  @UseGuards(AuthGuard())
  getAllUsers(
    @Query() filterDto: GetUsersFilterDto,
    @GetUser() user: User,
  ): Promise<Array<User>> {
    if (!this.allowedRole.includes(user.role)) {
      throw new ForbiddenException();
    }
    return this.usersService.getAllUsers(filterDto);
  }

  //   @Get('/:id')
  //   getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Movie> {
  //     return this.usersService.getMovieById(id);
  //   }

  //   @Post()
  //   @UseGuards(AuthGuard())
  //   createMovie(
  //     @Body() createMovieDto: CreateMovieDto,
  //     @GetUser() user: User,
  //   ): Promise<Movie> {
  //     const allowedRole: Array<UserRole> = [UserRole.ADMIN, UserRole.SUPER_ADMIN];

  //     if (!allowedRole.includes(user.role)) {
  //       throw new ForbiddenException();
  //     }

  //     this.logger.verbose(
  //       `User "${user.username}" creating a new movie. Data: ${JSON.stringify(
  //         createMovieDto,
  //       )}`,
  //     );

  //     return this.UsersService.createMovie(createMovieDto);
  //   }

  //   @Delete('/:id')
  //   @UseGuards(AuthGuard())
  //   deleteMovie(
  //     @Param('id', ParseIntPipe) id: number,
  //     @GetUser() user: User,
  //   ): Promise<void> {
  //     const allowedRole: Array<UserRole> = [UserRole.ADMIN, UserRole.SUPER_ADMIN];

  //     if (!allowedRole.includes(user.role)) {
  //       throw new ForbiddenException();
  //     }

  //     this.logger.verbose(
  //       `User "${user.username}" deleting a movie with ID ${id}.`,
  //     );

  //     return this.UsersService.deleteMovie(id);
  //   }

  //   @Patch('/:id')
  //   @UseGuards(AuthGuard())
  //   updateMovie(
  //     @Param('id', ParseIntPipe) id: number,
  //     @Body() updateMovieDto: UpdateMovieDto,
  //     @GetUser() user: User,
  //   ): Promise<Movie> {
  //     const allowedRole: Array<UserRole> = [UserRole.ADMIN, UserRole.SUPER_ADMIN];

  //     if (!allowedRole.includes(user.role)) {
  //       throw new ForbiddenException();
  //     }

  //     return this.UsersService.updateMovie(id, updateMovieDto);
  //   }
}
