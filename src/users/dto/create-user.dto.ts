import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'should be a string' })
  @IsEmail({}, { message: 'email incorrect' })
  @ApiProperty({ example: 'lolkek@gmail.com', description: 'user email' })
  readonly email: string;

  @IsString({ message: 'should be a string' })
  @Length(4, 16, { message: '4 < password < 16' })
  @ApiProperty({ example: 'lolkek', description: 'user password' })
  readonly password: string;
}
