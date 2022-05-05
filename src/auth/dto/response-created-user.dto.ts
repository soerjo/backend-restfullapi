import { CreateAuthDto } from './create-auth.dto';

export class ResponseCreatedUser {
  email: string;
  username: string;

  constructor(obj: Partial<CreateAuthDto>) {
    (this.email = obj.email), (this.username = obj.username);
  }
}
