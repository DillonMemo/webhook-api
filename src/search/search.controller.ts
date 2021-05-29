import { Body, Controller, Get, Post } from '@nestjs/common';
import got from 'got/dist/source';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchServices: SearchService) {}

  @Get()
  getSearchTest(): string {
    return 'Hello Get Search';
  }

  @Post()
  async getSearch(
    @Body() postData: any,
  ): Promise<{ isTest: boolean; message?: string }> {
    try {
      console.log('postData:', postData);

      const incoming_url =
        'https://wh.jandi.com/connect-api/webhook/20585156/f1467d35d19c3f901491ac4184ec4d15';
      const args = {
        body: "무엇이든 물어보살 ('ㅁ')b",
      };

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

      return {
        isTest: true,
        message: args.body,
      };
    } catch (error) {
      console.error(error);

      return {
        isTest: false,
      };
    }

    // return this.searchServices.getSearch();
  }
}
