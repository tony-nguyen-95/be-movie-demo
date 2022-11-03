import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesModule } from './movies/movies.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CineplexsModule } from './cineplexs/cineplexs.module';
import { CinemasModule } from './cinemas/cinemas.module';
import { ShowtimesModule } from './showtimes/showtimes.module';
import { SeatTicketsModule } from './seat-tickets/seat-tickets.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ssl: true,
      extra: {
        ssl: { rejectUnauthorized: false },
      },
      type: 'mysql',
      autoLoadEntities: true,
      synchronize: true,
      host: 'localhost',
      port: 3306,
      username: 'root',
      // password: configService.get('DB_PASSWORD'),
      database: 'movie_booking',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    MoviesModule,
    UsersModule,
    AuthModule,
    CineplexsModule,
    CinemasModule,
    ShowtimesModule,
    SeatTicketsModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {}
}
