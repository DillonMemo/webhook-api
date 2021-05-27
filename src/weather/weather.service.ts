import { Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import got from 'got';

@Injectable()
export class WeatherService {
  dev() {
    return 'Hello Dev!!';
  }

  @Interval(5000)
  async devInterval(): Promise<void> {
    const message = '5초단위로 실행(테스트)';
    const args = {
      body: message,
    };
    await got.post(
      'https://wh.jandi.com/connect-api/webhook/20585156/cc73f65de82e1e591a8b2166c7b91d28',
      {
        headers: {
          Accept: 'application/vnd.tosslab.jandi-v2+json',
          'Content-type': 'application/json',
        },
        body: JSON.stringify(args),
      },
    );
  }
}
// ?lat=37.5170&lon=127.0289&appid= 926458919a73df77645df1c77ef9fa5c&units=metric
