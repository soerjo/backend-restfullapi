import { IsNotEmpty, IsString } from 'class-validator';
import { Role } from 'src/common/type';

export class PayloadJwtDto {
  @IsString()
  @IsNotEmpty()
  userid: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  role: Role[];

  constructor(obj: PayloadJwtDto) {
    this.userid = obj.userid;
    this.username = obj.username;
    this.role = obj.role;
  }
}
