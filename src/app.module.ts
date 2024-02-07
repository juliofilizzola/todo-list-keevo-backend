import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TodoModule } from './modules/todo/todo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './modules/todo/entities/todo.entity';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from './interceptor/GlobalExceptionFilter';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (conf: ConfigService) => ({
        type: 'postgres',
        host: conf.get('DB_HOST'),
        port: conf.get('DB_PORT'),
        username: conf.get('DB_USER'),
        password: conf.get('DB_PASSWORD'),
        database: conf.get('DB_DATABASE'),
        entities: [Todo],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    TodoModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
