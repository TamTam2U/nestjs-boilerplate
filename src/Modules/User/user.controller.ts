import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { Response } from '@app/shared/utils/response';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

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
    const cek = await this.userService.findByEmail(createUser.email);
    if (cek) {
      return Response.error({
        message: 'Email already exists',
        status: 422,
      });
    }
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

  @ApiOkResponse({
    status: 200,
    description: 'Get user',
  })
  @Get('/find/:id')
  async findById(@Param('id') id: number) {
    const data = await this.userService.findById(id);
    if (data) {
      return Response.success({
        message: 'User found',
        data: data,
      });
    } else {
      return Response.error({
        message: 'User not found',
        status: 404,
      });
    }
  }

  @ApiOkResponse({
    status: 200,
    description: 'Update user',
  })
  @Put('/update/:id')
  @ApiBody({
    type: UpdateUserDto,
    description: 'Update user',
  })
  async update(@Param('id') id: number, @Body() updateUser: UpdateUserDto) {
    const data = await this.userService.update(id, updateUser);
    if (data) {
      return Response.success({
        message: 'User updated',
        data: data,
      });
    } else {
      return Response.error({
        message: 'User not updated',
        status: 422,
      });
    }
  }

  @ApiOkResponse({
    status: 200,
    description: 'Delete user',
  })
  @Delete('/delete/:id')
  async delete(@Param('id') id: number) {
    const data = await this.userService.delete(id);
    if (data) {
      return Response.success({
        message: 'User deleted',
      });
    } else {
      return Response.error({
        message: 'User not deleted',
        status: 422,
      });
    }
  }
}
