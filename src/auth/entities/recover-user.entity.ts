import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class RecoverUser {
  @PrimaryColumn()
  userid: string;

  @Column()
  hash: string;
}
