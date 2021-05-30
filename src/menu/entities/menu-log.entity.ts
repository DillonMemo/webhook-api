import { IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class MenuLog extends CoreEntity {
  @Column()
  @IsString()
  text: string;
}
