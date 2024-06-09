import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { Response } from '@app/shared/utils/response';
import { CreateUserDto } from './dto/user.dto';

@ApiTags('User')
@Controller('/api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOkResponse({
    status: 200,
    description: 'Get all user',
  })
  @Get('/list')
  async list() {
    const data = await this.userService.list();
    if (data.length === 0) {
      return Response.error({
        message: 'No user found',
        status: 404,
      });
    } else {
      return Response.success({
        message: 'List of user',
        data: data,
      });
    }
  }

  @ApiOkResponse({
    status: 200,
    description: 'Create user',
  })
  @Post('/create')
  @ApiBody({
    type: CreateUserDto,
    description: 'Create user',
  })
  async create(@Body() createUser: CreateUserDto) {
    const data = await this.userService.create(createUser);
    if (data) {
      return Response.success({
        message: 'User created',
        data: data,
      });
    } else {
      return Response.error({
        message: 'User not created',
        status: 422,
      });
    }
  }
}
