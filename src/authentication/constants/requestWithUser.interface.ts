import { Request } from 'express';

interface RequestWithUser extends Request {
  user: any;
}

interface UserLoginRequest extends Request {
  email: string;
  password: string;
}

export { RequestWithUser, UserLoginRequest };
