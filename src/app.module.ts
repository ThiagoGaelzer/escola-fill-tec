import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { QuestionsModule } from './questions/questions.module';
import { AuthModule } from './authentication/authentication.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'host.docker.internal',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'escola_fill_tec',
      entities: [__dirname + '/**/*.entity{.ts,.js}']
    }),
    AuthModule,
    UsersModule,
    QuestionsModule,
  ],
})

export class AppModule {}
