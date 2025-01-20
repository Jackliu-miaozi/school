import { hash } from 'bcryptjs';
import { NextResponse } from 'next/server';
import { z } from 'zod';

import { db } from '@/server/db';

const passwordSchema = z
  .string()
  .min(8)
  .refine(
    (password) => {
      const hasUpperCase = /[A-Z]/.test(password);
      const hasLowerCase = /[a-z]/.test(password);
      const hasNumbers = /\d/.test(password);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
      return hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar;
    },
    {
      message: '密码必须包含大小写字母、数字和特殊字符',
    },
  );

const userSchema = z.object({
  email: z.string().email(),
  password: passwordSchema,
  name: z.string().min(1),
});

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Record<string, unknown>;
    const { email, password, name } = userSchema.parse(body);

    // 检查邮箱是否已存在
    const exists = await db.user.findUnique({
      where: { email },
    });

    if (exists) {
      return NextResponse.json({ error: '邮箱已被注册' }, { status: 400 });
    }

    // 创建新用户
    const hashedPassword = await hash(password, 10);
    const user = await db.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    return NextResponse.json({
      message: '注册成功',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('注册失败:', error);
    return NextResponse.json({ error: '注册失败' }, { status: 500 });
  }
}
