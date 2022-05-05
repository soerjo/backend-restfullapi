import { Jemaat } from 'src/module/jemaat/entities/jemaat.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class KelompokMurid {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nama_kelompok_murid: string;

  @ManyToOne(() => Jemaat, (jemaat) => jemaat.id)
  @JoinColumn()
  pembimbing: Jemaat;

  @ManyToMany(() => Jemaat)
  @JoinTable()
  murid: Jemaat[];

  @Column()
  buku: string;

  @Column({ type: 'float' })
  performance_a_month: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
