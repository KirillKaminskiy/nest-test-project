import { ValidationPipe } from './../pipes/validaton.pipe';
import { BanUserDto } from './dto/ban-user.dto';
import { AddRoleDto } from './dto/add-role.dto';
import { RolesAuthGuard } from './../auth/roles.guard';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { User } from './users.model';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles-auth.decorator';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 200, type: User })
  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  @Roles('ADMIN')
  @UseGuards(RolesAuthGuard)
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  getAll() {
    return this.usersService.getAllUsers();
  }

  @Roles('ADMIN')
  @UseGuards(RolesAuthGuard)
  @ApiOperation({ summary: 'add role' })
  @ApiResponse({ status: 200 })
  @Post('/role')
  addRole(@Body() addRoleDto: AddRoleDto) {
    return this.usersService.addRole(addRoleDto);
  }

  @Roles('ADMIN')
  @UseGuards(RolesAuthGuard)
  @ApiOperation({ summary: 'ban user' })
  @ApiResponse({ status: 200 })
  @Post('/ban')
  banUser(@Body() banUserDto: BanUserDto) {
    return this.usersService.banUser(banUserDto);
  }
}
