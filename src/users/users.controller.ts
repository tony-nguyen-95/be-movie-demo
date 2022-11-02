import {
  Controller,
  ForbiddenException,
  Get,
  Logger,
  Param,
  ParseIntPipe,
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

  @Get('/user-profile')
  @UseGuards(AuthGuard())
  getUser(@GetUser() user: User): Promise<User> {
    return this.usersService.getUser(user);
  }
}
