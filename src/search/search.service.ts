import { Injectable } from '@nestjs/common';
import got from 'got/dist/source';
import { CoreInput, CoreOutput } from 'src/common/dtos/core.dto';

@Injectable()
export class SearchService {
  async getSearch({ data }: CoreInput): Promise<CoreOutput> {
    try {
      console.log('postData:', data);

      if (data) {
        const client_id = 'd_2t8QGZCWQAcIJ7CNdN';
        const client_secret = 'EiCXNTAq6X';
        const outgoing_url = `https://openapi.naver.com/v1/search/blog?query=${data}`;

        let response = await got.get(outgoing_url, {
          headers: {
            'X-Naver-Client-Id': client_id,
            'X-Naver-Client-Secret': client_secret,
          },
        });

        console.log('api', response.body);

        const incoming_url =
          'https://wh.jandi.com/connect-api/webhook/20585156/f1467d35d19c3f901491ac4184ec4d15';
        const args = {
          body: "무엇이든 물어보살 ('ㅁ')b",
        };

        response = await got.post(incoming_url, {
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

        return {
          ok: true,
        };
      } else {
        throw new Error('검색어 입력은 필수 입니다.');
      }
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }
}
