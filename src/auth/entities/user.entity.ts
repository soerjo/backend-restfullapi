import { Role } from 'src/common/type';
import { Jemaat } from 'src/module/jemaat/entities/jemaat.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class user {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ enum: Role, type: 'enum' })
  role: Role;

  @OneToOne(() => Jemaat, (jemaat) => jemaat.id, { onDelete: 'CASCADE' })
  @JoinColumn()
  jemaat: Jemaat;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
