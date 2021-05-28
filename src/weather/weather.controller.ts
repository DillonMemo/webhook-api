import { Controller, Get } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  dev(): string {
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
