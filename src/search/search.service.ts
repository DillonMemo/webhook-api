import { Injectable } from '@nestjs/common';
import got from 'got/dist/source';

@Injectable()
export class SearchService {
  async getSearch(): Promise<void> {
    try {
      //   const client_id = 'd_2t8QGZCWQAcIJ7CNdN';
      //   const client_secret = 'EiCXNTAq6X';
      //   const outgoing_url = `https://openapi.naver.com/v1/search/blog?query=`;

      const incoming_url =
        'https://wh.jandi.com/connect-api/webhook/20585156/f1467d35d19c3f901491ac4184ec4d15';
      const args = {
        body: "무엇이든 물어보살 ('ㅁ')b",
      };
      console.log(args);
      const response = await got.post(incoming_url, {
        headers: {
          Accept: 'application/vnd.tosslab.jandi-v2+json',
          'Content-type': 'application/json',
        },
        body: JSON.stringify(args),
      });

      if (response.statusCode !== 200) {
        const errorMessage = `error ${response.statusCode}`;
        throw new Error(errorMessage);
      }
    } catch (error) {
      return console.error(error);
    }
  }
}
