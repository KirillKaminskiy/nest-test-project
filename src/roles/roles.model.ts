import { UserRoles } from './user-roles.model';
import { User } from './../users/users.model';
import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';

interface RoleCreationAttrs {
  value: string;
  description: string;
}

@Table({ tableName: 'role_test_nest' })
export class Role extends Model<Role, RoleCreationAttrs> {
  @ApiProperty({ example: 1, description: 'unique identifire' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'ADMIN', description: 'full access' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  value: string;

  @ApiProperty({ example: 'full access', description: 'access' })
  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @BelongsToMany(() => User, () => UserRoles)
  users: User[];
}
