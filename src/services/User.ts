import { Request, ResponsePromise } from '../utils';

export default class UserService {
  static createSession(email: string, password: string): ResponsePromise<{ token: string; }> {
    return Request.post('/api/user/session', {
      email,
      password,
    });
  }
};
