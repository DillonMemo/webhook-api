import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import got from 'got/dist/source';
import {
  CLEAR_MENU_INCOMING_URL,
  CREATE_MENU_INCOMING_URL,
  DELETE_MENU_INCOMING_URL,
} from 'src/common/common.constant';
import { CoreInput, IncomingInput } from 'src/common/dtos/core.dto';
import { Repository } from 'typeorm';
import { MenuInput } from './dtos/menu.dto';
import { Menu } from './entities/menu.entity';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu) private readonly menus: Repository<Menu>,
  ) {}

  /**
   * 메뉴 생성
   * @param {CoreInput} param0
   */
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

      console.log(response.statusMessage);
    } else {
      // menu 생성
      await this.menus.save(this.menus.create(result));

      const args = {
        body: `**(${name})** 추가 하였습니다.`,
      };

      const response = await got.post(CREATE_MENU_INCOMING_URL, {
        headers: {
          Accept: 'application/vnd.tosslab.jandi-v2+json',
          'Content-type': 'application/json',
        },
        body: JSON.stringify(args),
      });

      console.log(response.statusMessage);
    }
  }

  async deleteMenu({ data: name, writerName }: CoreInput): Promise<void> {
    const menu = await this.menus.findOne({ name });

    if (menu) {
      await this.menus.delete({ name: menu.name });

      const args = {
        body: `**${writerName}**님이 **(${menu.name})** 삭제 하였습니다.`,
      };

      const response = await got.post(DELETE_MENU_INCOMING_URL, {
        headers: {
          Accept: 'application/vnd.tosslab.jandi-v2+json',
          'Content-type': 'application/json',
        },
        body: JSON.stringify(args),
      });

      console.log(response.statusMessage);
    } else {
      const args = {
        body: `**(${name})** 존재 하지 않습니다.`,
      };

      const response = await got.post(DELETE_MENU_INCOMING_URL, {
        headers: {
          Accept: 'application/vnd.tosslab.jandi-v2+json',
          'Content-type': 'application/json',
        },
        body: JSON.stringify(args),
      });

      console.log(response.statusMessage);
    }
  }

  @Cron('0 0 11 * * *')
  async clearMenu(postData: CoreInput): Promise<void> {
    await this.menus.clear();

    const args: IncomingInput = {
      body: '',
      connectColor: '#86E57F',
      connectInfo: [
        {
          title: '**등록**',
          description: '/밥추가 {음식명}',
        },
        {
          title: '**삭제**',
          description: '/밥삭제 {음식명}',
        },
        {
          title: '**설정**',
          description: '/밥설정         ***[주의] 밥 목록을 초기화 합니다!!***',
        },
      ],
    };

    if (postData) {
      const { writerName } = postData;

      args.body = `**${writerName}**님 **밥 설정(초기화)** 완료 되었습니다.`;
    } else {
      args.body = '**설정(초기화)** 완료! | 밥을 등록 해주세요.';
    }

    const response = await got.post(CLEAR_MENU_INCOMING_URL, {
      headers: {
        Accept: 'application/vnd.tosslab.jandi-v2+json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(args),
    });

    console.log(response.statusMessage);
  }
}
