import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { User } from '../users/user.entity';
import { Repository } from 'typeorm';
import { UserRole } from '../users/user-role.enum';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.usersRepository.create({
      username,
      password: hashedPassword,
      role: UserRole.CLIENT,
      avatar: 'default',
    });

    try {
      await this.usersRepository.save(user);
    } catch (error) {
      if (error.code === '23505') {
        // duplicate username
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialsDto;

    const userLogin = await this.usersRepository.findOne({
      where: {
        username,
      },
    });

    if (userLogin && (await bcrypt.compare(password, userLogin.password))) {
      const payload: JwtPayload = {
        userId: userLogin.id,
        username: userLogin.username,
        role: userLogin.role,
        createDate: userLogin.updateDate,
      };
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }

  //   authorize(arrRole: Array<UserRole>, user: User) {
  //     const isAllowed = arrRole.findIndex((role) => user.role === role) > -1;
  //     if (!isAllowed) {
  //       throw new UnauthorizedException();
  //     }
  //   }
}
