import { Body, Controller, Post } from '@nestjs/common';
import { CoreInput } from 'src/common/dtos/core.dto';
import { MenuService } from './menu.service';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuServices: MenuService) {}

  @Post('/create')
  createMenu(@Body() postData: CoreInput): Promise<void> {
    return this.menuServices.createMenu(postData);
  }

  @Post('/delete')
  deleteMenu(@Body() postData: CoreInput): Promise<void> {
    return this.menuServices.deleteMenu(postData);
  }

  @Post('/clear')
  clearMenu(@Body() postData: CoreInput): Promise<void> {
    return this.menuServices.clearMenu(postData);
  }

  @Post('/select')
  selectMenu(): Promise<void> {
    return this.menuServices.selectMenu();
  }
}
