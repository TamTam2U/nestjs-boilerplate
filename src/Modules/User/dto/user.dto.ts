import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'User name',
    type: 'string',
    required: true,
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'User email',
    type: 'string',
    required: true,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User password',
    type: 'string',
    required: true,
  })
  @IsNotEmpty()
  password: string;
}
