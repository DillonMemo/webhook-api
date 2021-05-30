import { Menu } from '../entities/menu.entity';

// export type CreateMenuInput = Pick<Menu, 'name'> & { test: boolean };
export type MenuInput = Pick<Menu, 'name' | 'writerName'>;
