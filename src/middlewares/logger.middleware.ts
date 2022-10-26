import { Injectable, NestMiddleware, UseGuards } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthGuard } from '@nestjs/passport';
// import { GetUser } from '../auth/get-user.decorator';
// import { User } from '../users/user.entity';

@Injectable()
@UseGuards(AuthGuard())
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    next();
  }

  //   authen(@GetUser() user: User, next: NextFunction) {
  //     console.log(user);
  //     next();
  //   }
}
