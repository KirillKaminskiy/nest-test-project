import { BanUserDto } from './dto/ban-user.dto';
import { AddRoleDto } from './dto/add-role.dto';
import { RolesService } from './../roles/roles.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private rolesService: RolesService,
  ) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    const role = await this.rolesService.getRoleByValue('USER');
    await user.$set('roles', [role.id]);
    user.roles = [role];
    return user;
  }

  async getAllUsers() {
    return this.userRepository.findAll({ include: { all: true } });
  }

  async getUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });
  }

  async addRole(addRoleDto: AddRoleDto) {
    const user = await this.userRepository.findByPk(addRoleDto.userId);
    const role = await this.rolesService.getRoleByValue(addRoleDto.value);
    if (user && role) {
      await user.$add('role', role.id);
      return addRoleDto;
    }
    throw new HttpException("User or Role didn't find", HttpStatus.NOT_FOUND);
  }

  async banUser(banUserDto: BanUserDto) {
    const user = await this.userRepository.findByPk(banUserDto.userId);
    if (!user) {
      throw new HttpException("User didn't find", HttpStatus.NOT_FOUND);
    }
    user.banned = true;
    user.banReason = banUserDto.banReason;
    await user.save();
  }
}
