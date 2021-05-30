import { IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Menu extends CoreEntity {
  @Column({ unique: true })
  @IsString()
  name: string;

  @Column()
  @IsString()
  writerName: string;
}
