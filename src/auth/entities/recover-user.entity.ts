import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class RecoverUser {
  @PrimaryColumn()
  email: string;

  @Column()
  hash: string;
}
