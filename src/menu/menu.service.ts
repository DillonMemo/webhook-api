import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import got from 'got/dist/source';
import { CREATE_MENU_INCOMING_URL } from 'src/common/common.constant';
import { CoreInput, IncomingOutput } from 'src/common/dtos/core.dto';
import { Repository } from 'typeorm';
import { MenuInput } from './dtos/menu.dto';
import { Menu } from './entities/menu.entity';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu) private readonly menus: Repository<Menu>,
  ) {}

  async getTest(): Promise<string> {
    try {
      const result: MenuInput = {
        name: '돈가스',
        writerName: 'dillon',
      };

      const args: IncomingOutput = {
        body: '',
      };

      const menu = await this.menus.findOne({ name: result.name });

      if (menu) {
        args.body = '누군가가 이미 등록 했어요.';
        // call incoming api
        throw new Error(args.body);
      }

      // menu 생성
      await this.menus.save(this.menus.create(result));

      return 'menu get test';
    } catch (error) {
      console.error(error);
      return error.message;
    }
  }

  async createMenu({ data: name, writerName }: CoreInput): Promise<void> {
    const result: MenuInput = {
      name,
      writerName,
    };

    const menu = await this.menus.findOne({ name });

    if (menu) {
      const args = {
        body: `**${menu.writerName}**님이 **(${menu.name})** 이미 추가 하였습니다.`,
      };
      const response = await got.post(CREATE_MENU_INCOMING_URL, {
        headers: {
          Accept: 'application/vnd.tosslab.jandi-v2+json',
          'Content-type': 'application/json',
        },
        body: JSON.stringify(args),
      });

      console.log(response);
    } else {
      // menu 생성
      await this.menus.save(this.menus.create(result));

      const args = {
        body: `**(${name})** 추가 하였습니다`,
      };

      const response = await got.post(CREATE_MENU_INCOMING_URL, {
        headers: {
          Accept: 'application/vnd.tosslab.jandi-v2+json',
          'Content-type': 'application/json',
        },
        body: JSON.stringify(args),
      });

      console.log(response);
    }
  }
}
