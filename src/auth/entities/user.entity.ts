import { Exclude } from 'class-transformer';
import { Role } from 'src/common/type';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column('simple-array', { array: true })
  role: Role[];

  @Exclude()
  @Column()
  password: string;

  @Exclude()
  @Column({ default: Role.ADMIN })
  createdBy: string;

  @Exclude()
  @Column({ nullable: true })
  updatedBy: string;

  @Exclude()
  @CreateDateColumn()
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn()
  updatedAt: Date;
}
