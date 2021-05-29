import { Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import got from 'got';

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

  @Interval(10000)
  async devInterval(): Promise<void> {
    try {
      if (process.env.NODE_ENV === 'prod') {
        const message = '10초단위로 실행(테스트)';
        const args = {
          body: message,
        };
        const response = await got.post(
          'https://wh.jandi.com/connect-api/webhook/20585156/cc73f65de82e1e591a8b2166c7b91d28',
          {
            headers: {
              Accept: 'application/vnd.tosslab.jandi-v2+json',
              'Content-type': 'application/json',
            },
            body: JSON.stringify(args),
          },
        );
        if (response.statusCode !== 200) {
          const errorMessage = `error ${response.statusCode}`;
          throw new Error(errorMessage);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
}
// ?lat=37.5170&lon=127.0289&appid= 926458919a73df77645df1c77ef9fa5c&units=metric
