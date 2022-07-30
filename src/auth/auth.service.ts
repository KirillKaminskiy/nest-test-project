import { User } from './../users/users.model';
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';

import { CreateUserDto } from './../users/dto/create-user.dto';
import { UsersService } from './../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}
  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async registration(userDto: CreateUserDto) {
    const newUser = await this.userService.getUserByEmail(userDto.email);
    if (newUser) {
      throw new HttpException('Ti yge v base loshok', HttpStatus.BAD_REQUEST);
    }
    const hashPassword = await bcryptjs.hash(userDto.password, 5);
    const user = await this.userService.createUser({
      ...userDto,
      password: hashPassword,
    });
    return this.generateToken(user);
  }

  private async generateToken(user: User) {
    const payload = { email: user.email, id: user.id, roles: user.roles };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userDto: CreateUserDto): Promise<User> {
    const user = await this.userService.getUserByEmail(userDto.email);
    const passwordEquals = await bcryptjs.compare(
      userDto.password,
      user.password,
    );
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({ message: 'Unauthorized' });
  }
}
