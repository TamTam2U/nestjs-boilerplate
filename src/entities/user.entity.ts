import { Column, Entity } from 'typeorm';
import { Base } from './base.entity';
import { Exclude } from 'class-transformer';

@Entity('users')
export class User extends Base {
  @Column()
  name: string;

  @Column()
  email: string;

  @Exclude()
  @Column()
  password: string;
}
