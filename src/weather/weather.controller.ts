import { Body, Controller, Get, Header, Post, Req, Res } from '@nestjs/common';
import { WeatherOutput } from './dto/weather.dto';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  dev() {
    return this.weatherService.dev();
  }

  //   @Post()
  //   @Header('Content-Type', 'application/json')
  //   getWeather(
  //     @Body() postData: { testMessage: string },
  //   ): Promise<WeatherOutput> {
  //     return this.weatherService.getWeather(postData);
  //   }
}
