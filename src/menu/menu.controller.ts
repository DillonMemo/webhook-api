import { Body, Controller, Get, Post } from '@nestjs/common';
import { CoreInput } from 'src/common/dtos/core.dto';
import { MenuService } from './menu.service';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuServices: MenuService) {}

  @Get()
  getTest(): Promise<string> {
    return this.menuServices.getTest();
  }

  @Post('/create')
  createMenu(@Body() postData: CoreInput): Promise<void> {
    return this.menuServices.createMenu(postData);
  }

  //   @Post('/delete')
  //   deleteMenu(@Body() postData: CoreInput): Promise<CoreOutput> {
  //       return this.menuServices.deleteMenu(postData);
  //   }
}
