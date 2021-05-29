import { Body, Controller, Post } from '@nestjs/common';
import { CoreInput, CoreOutput } from 'src/common/dtos/core.dto';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchServices: SearchService) {}

  @Post()
  async getSearch(@Body() postData: CoreInput): Promise<CoreOutput> {
    return this.searchServices.getSearch(postData);
  }
}
