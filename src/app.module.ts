import { Module } from '@nestjs/common';
import { WeatherModule } from './weather/weather.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ScheduleModule.forRoot(), WeatherModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
