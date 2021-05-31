import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import got from 'got/dist/source';
import {
  NEWS_INCOMING_URL,
  removeTag,
  SEARCH_INCOMING_URL,
} from 'src/common/common.constant';
import { CoreInput, CoreOutput, IncomingInput } from 'src/common/dtos/core.dto';
import { SearchDto } from './dto/search.dto';

@Injectable()
export class SearchService {
  private readonly CLIENT_ID = 'd_2t8QGZCWQAcIJ7CNdN';
  private readonly CLIENT_SECRET = 'EiCXNTAq6X';

  async getSearch({ data }: CoreInput): Promise<CoreOutput> {
    try {
      if (data) {
        const apiUrl = `https://openapi.naver.com/v1/search/blog?query=${data}`;

        const searchResponse = await got.get<string>(apiUrl, {
          headers: {
            'X-Naver-Client-Id': this.CLIENT_ID,
            'X-Naver-Client-Secret': this.CLIENT_SECRET,
          },
        });
        if (searchResponse.statusCode !== 200) {
          const errorMessage = `Search API Error ${searchResponse.statusCode}`;
          throw new Error(errorMessage);
        }

        const parserSearch: SearchDto = JSON.parse(searchResponse.body);

        const args: IncomingInput = {
          body: `**${data}** 검색 결과를 알려드림`,
          connectColor: '#86E57F',
          connectInfo: parserSearch.items.slice(0, 5).map(item => ({
            title: `[${removeTag(item.title)}](${item.link})`,
            description: removeTag(item.description),
          })),
        };

        const incomingUrl = SEARCH_INCOMING_URL;

        await got.post(incomingUrl, {
          headers: {
            Accept: 'application/vnd.tosslab.jandi-v2+json',
            'Content-type': 'application/json',
          },
          body: JSON.stringify(args),
        });

        // if (response.statusCode !== 200) {
        //   const errorMessage = `error ${response.statusCode}`;
        //   throw new Error(errorMessage);
        // }

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

  @Cron('0 0 2 * * 1-5') // 서버의 timezone('asia/seoul')이지만 시간을 -9 하여 계산
  async getNews(): Promise<CoreOutput> {
    try {
      if (process.env.NODE_ENV === 'prod') {
        const apiUrl =
          'https://openapi.naver.com/v1/search/news.json?query=%EC%A3%BC%EC%8B%9D&display=10&start=1&sort=sim';
        const newsResponse = await got.get<string>(apiUrl, {
          headers: {
            'X-Naver-Client-Id': this.CLIENT_ID,
            'X-Naver-Client-Secret': this.CLIENT_SECRET,
          },
        });

        if (newsResponse.statusCode !== 200) {
          const errorMessage = `error ${newsResponse.statusCode}`;
          throw new Error(errorMessage);
        }

        const parserNews: SearchDto = JSON.parse(newsResponse.body);

        const args: IncomingInput = {
          body: `**${
            new Date().getMonth() + 1
          }월 ${new Date().getDate()}일 오늘 이슈 알려드림**`,
          connectColor: '#86E57F',
          connectInfo: parserNews.items.slice(0, 5).map(
            item =>
              item.originallink && {
                title: `[${removeTag(item.title)}](${item.originallink})`,
                description: removeTag(item.description),
              },
          ),
        };

        const incomingUrl = NEWS_INCOMING_URL;
        const response = await got.post<string>(incomingUrl, {
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
      }
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }
}
