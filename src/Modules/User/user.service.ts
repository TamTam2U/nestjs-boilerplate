import { User } from '@app/entities/user.entity';
import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async list(): Promise<User[]> {
    const users = await this.userRepository.find({
      where: { deleted_at: null },
    });
    return users.map((user) => plainToClass(User, user));
  }

  async create(userDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.name = userDto.name;
    user.email = userDto.email;
    user.password = bcrypt.hashSync(userDto.password, 10);
    user.created_at = new Date();
    try {
      return await this.userRepository.save(user);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY' || error.errno === 1062) {
        throw new HttpException(
          'Email already exists',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      } else {
        throw new InternalServerErrorException({
          message: 'An error occurred while creating the user',
          error: error.message,
        });
      }
    }
  }

  async findById(id: number): Promise<User> {
    const users = await this.userRepository.findOne({ where: { id } });
    if (!users) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return plainToClass(User, users);
  }
}
