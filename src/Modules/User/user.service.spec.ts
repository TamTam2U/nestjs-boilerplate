import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { User } from '../../entities/user.entity';
import { CreateUserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';

const mockUserRepository = () => ({
  find: jest.fn(),
  save: jest.fn(),
});

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: getRepositoryToken(User), useFactory: mockUserRepository },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('list', () => {
    it('should return an array of users', async () => {
      const user = new User();
      user.name = 'Test User';
      user.email = 'test@example.com';
      user.password = '123456';

      jest.spyOn(userRepository, 'find').mockResolvedValueOnce([user]);

      const result = await service.list();

      expect(result).toEqual([plainToClass(User, user)]);
      expect(userRepository.find).toHaveBeenCalledWith({
        where: { deleted_at: null },
      });
    });
  });

  describe('create', () => {
    it('should throw an error if user already exists', async () => {
      const createUserDto: CreateUserDto = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password',
      };

      jest.spyOn(userRepository, 'find').mockResolvedValueOnce([new User()]);

      //   await expect(service.create(createUserDto)).rejects.toThrow(
      //     HttpException,
      //   );
      await expect(service.create(createUserDto)).rejects.toThrow(
        'User already exists',
      );
    });

    it('should create and return the new user', async () => {
      const createUserDto: CreateUserDto = {
        name: 'TestUser',
        email: 'test@google.com',
        password: 'password',
      };
      const user = new User();
      user.name = createUserDto.name;
      user.email = createUserDto.email;
      user.password = bcrypt.hashSync(createUserDto.password, 10);
      user.created_at = new Date();

      //   jest.spyOn(userRepository, 'find').mockResolvedValueOnce([]);
      jest.spyOn(userRepository, 'save').mockResolvedValueOnce(user);

      const result = await service.create(createUserDto);

      expect(result).toEqual(user);
      //   expect(userRepository.find).toHaveBeenCalledWith({
      //     where: { email: createUserDto.email },
      //   });
      //   expect(userRepository.save).toHaveBeenCalledWith(user);
    });

    it('should throw an internal server error if saving fails', async () => {
      const createUserDto: CreateUserDto = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password',
      };

      //   jest.spyOn(userRepository, 'find').mockResolvedValueOnce([]);
      jest
        .spyOn(userRepository, 'save')
        .mockRejectedValueOnce(new Error('Saving error'));

      //   await expect(service.create(createUserDto)).rejects.toThrow(
      //     InternalServerErrorException,
      //   );
      await expect(service.create(createUserDto)).rejects.toThrow(
        'An error occurred while creating the user',
      );
    });
  });
});
