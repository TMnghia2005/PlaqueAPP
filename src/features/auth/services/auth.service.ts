import client from '../../../api/client';

export class AuthService {
  static async login(email: string, password: string) {
    const { data } = await client.post('/api/auth/login', { email, password });
    return data;
  }

  static async getMe() {
    const { data } = await client.get('/api/auth/me');
    return data;
  }
}
