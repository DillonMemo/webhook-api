import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeatherModule } from './weather/weather.module';
import { ScheduleModule } from '@nestjs/schedule';
import { SearchModule } from './search/search.module';
import { MenuModule } from './menu/menu.module';
import { Menu } from './menu/entities/menu.entity';

console.log(
  'NODE_ENV',
  process.env.NODE_ENV,
  'DATABASE_URL',
  process.env.DATABASE_URL,
);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.test',
      ignoreEnvFile: process.env.NODE_ENV === 'prod', // 서버에 deploy 할 때 환경변수 파일을 사용하지 않습니다.
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('dev', 'prod', 'test').required(),
        DB_HOST: Joi.string(),
        DB_PORT: Joi.string(),
        DB_USERNAME: Joi.string(),
        DB_PASSWORD: Joi.string(),
        DB_NAME: Joi.string(),
      }),
    }),
    /** @description - https://docs.nestjs.com/techniques/database#typeorm-integration */
    TypeOrmModule.forRoot({
      type: 'postgres',
      ...(process.env.DATABASE_URL
        ? { url: process.env.DATABASE_URL }
        : {
            host: process.env.DB_HOST,
            port: +process.env.DB_PORT,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
          }),
      synchronize: true, // process.env.NODE_ENV !== 'prod',
      logging: true, // process.env.NODE_ENV !== 'prod' && process.env.NODE_ENV !== 'test',
      entities: [Menu],
    }),
    ScheduleModule.forRoot(),
    WeatherModule,
    SearchModule,
    MenuModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
