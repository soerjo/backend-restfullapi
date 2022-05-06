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
  public id: string;

  @Column()
  public username: string;

  @Column({ unique: true })
  public email: string;

  @Column('simple-array', { array: true })
  public role: Role[];

  @Exclude()
  @Column()
  public password: string;

  @Exclude()
  @Column({ default: Role.ADMIN })
  public createdBy: string;

  @Exclude()
  @Column({ nullable: true })
  public updatedBy: string;

  @Exclude()
  @CreateDateColumn()
  public createdAt: Date;

  @Exclude()
  @UpdateDateColumn()
  public updatedAt: Date;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
