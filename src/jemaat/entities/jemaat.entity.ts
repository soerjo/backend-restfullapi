import { Exclude } from 'class-transformer';
import { Baptis } from 'src/baptis/entities/bapti.entity';
import { KelompokMurid } from 'src/murid/entities/murid.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Gender } from '../type/gender.enum';
import { Role } from '../type/role.enum';

@Entity()
export class Jemaat {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  nama_lengkap: string;

  @Column({ enum: Gender, type: 'enum', default: Gender.PRIA })
  jenis_kelamin: Gender;

  @Column({ nullable: true, unique: true })
  email?: string;

  @Column({ nullable: true })
  nama_panggilan?: string;

  @Column({ nullable: true })
  tempat_lahir?: string;

  @Column({ type: 'date' })
  tanggal_lahir: Date;

  @Column({ nullable: true, type: 'text' })
  alamat?: string;

  @Column({ type: 'date', nullable: true })
  tanggal_lahir_baru?: Date;

  @Column({ enum: Role, type: 'enum', default: Role.JEMAAT })
  role?: Role;

  @Column({ nullable: true })
  blesscomn?: string;

  @Column({ nullable: true })
  wilayah_pelayanan?: string;

  @ManyToMany(() => KelompokMurid, { nullable: true })
  @JoinTable()
  kelompok_murid?: KelompokMurid[];

  @OneToOne(() => Baptis, (baptis) => baptis.id, { nullable: true })
  @JoinColumn()
  baptis?: Baptis;

  @Exclude()
  @CreateDateColumn()
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn()
  updatedAt: Date;
}
