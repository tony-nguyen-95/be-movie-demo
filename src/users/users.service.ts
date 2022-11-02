import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetUsersFilterDto } from './dto/get-users-filter.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getAllUsers(filterDto: GetUsersFilterDto): Promise<Array<User>> {
    const query = this.userRepository.createQueryBuilder('user');

    const users = await query.getMany();
    return users;
  }

  async getUser(user: User): Promise<User> {
    delete user.password;

    delete user.updateDate;

    return user;
  }
}
