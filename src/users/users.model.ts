import { UserRoles } from './../roles/user-roles.model';
import { Role } from './../roles/roles.model';
import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';

interface UserCreationAttrs {
  email: string;
  password: string;
}

@Table({ tableName: 'users_test_nest' })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({ example: 1, description: 'unique identifire' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'lolkek@gmail.com', description: 'user email' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @ApiProperty({ example: 'lolkek', description: 'user password' })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({ example: false, description: 'user status' })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  banned: boolean;

  @ApiProperty({ example: 'he is donkey', description: 'Why user was banned?' })
  @Column({ type: DataType.STRING, allowNull: true })
  banReason: string;

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];
}
