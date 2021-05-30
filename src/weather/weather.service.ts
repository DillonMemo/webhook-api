import { Injectable } from '@nestjs/common';

@Injectable()
export class WeatherService {
  dev(): string {
    return `Hello Dev!! ${process.env.NODE_ENV}
      ${process.env.DB_HOST}
      ${process.env.DB_PORT}
      ${process.env.DB_USERNAME}
      ${process.env.DB_PASSWORD}
      ${process.env.DB_NAME}`;
  }
}
