import { Module } from '@nestjs/common';
import { CineplexsService } from './cineplexs.service';
import { CineplexsController } from './cineplexs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cineplex } from './cineplex.entity';
import { AuthModule } from '../auth/auth.module';
// import { CinemasModule } from '../cinemas/cinemas.module';

@Module({
  providers: [CineplexsService],
  controllers: [CineplexsController],
  imports: [TypeOrmModule.forFeature([Cineplex]), AuthModule],
})
export class CineplexsModule {}
