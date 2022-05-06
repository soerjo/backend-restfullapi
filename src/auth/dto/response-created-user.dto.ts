import { CreateAuthDto } from './create-auth.dto';

export class ReturnUser {
  email: string;
  username: string;

  constructor(obj: Partial<CreateAuthDto>) {
    (this.email = obj.email), (this.username = obj.username);
  }
}
