import { Jemaat } from 'src/module/jemaat/entities/jemaat.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Baptis {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'date' })
  waktu: Date;

  @Column()
  nama_ayah: string;

  @Column()
  nama_ibu: string;

  @Column()
  alamat_ortu: string;

  @Column()
  saksi01: string;

  @Column()
  saksi02: string;

  @Column()
  surat_baptis: string;

  @ManyToOne(() => Jemaat, (jemaat) => jemaat.id)
  dibaptis_oleh: Jemaat;

  @OneToOne(() => Jemaat, (jemaat) => jemaat.id)
  @JoinColumn()
  jemaat: Jemaat;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
