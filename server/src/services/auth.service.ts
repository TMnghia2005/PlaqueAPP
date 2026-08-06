import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../config/database';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

export class AuthService {
  static async register(data: any) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
  }

  static async login(email: string, pass: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error('User not found');

    const isValid = await bcrypt.compare(pass, user.password);
    if (!isValid) throw new Error('Invalid password');

    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: '24h',
    });

    return { user, token };
  }

  static async validateToken(token: string) {
    return jwt.verify(token, JWT_SECRET);
  }
}
