import { User } from '@app/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async list(): Promise<User[]> {
    return await this.userRepository.find({ where: { deleted_at: null } });
  }

  async create(userDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.name = userDto.name;
    user.email = userDto.email;
    user.password = bcrypt.hashSync(userDto.password, 10);
    user.created_at = new Date();
    return await this.userRepository.save(user);
  }
}
