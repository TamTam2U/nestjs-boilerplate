import { Column, Entity } from 'typeorm';
import { Base } from './base.entity';

@Entity('users')
export class User extends Base {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
