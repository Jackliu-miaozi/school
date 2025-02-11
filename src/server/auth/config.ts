import svgCaptcha from 'svg-captcha';
import { PrismaAdapter } from '@auth/prisma-adapter';
import {
  type DefaultSession,
  type NextAuthConfig,
} from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { auth } from '@/server/auth';


import { db } from '@/server/db';

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession['user'];
    //DefaultSession 是 next-auth 提供的默认 session 类型
    //使session拓展了DefaultSession的user属性
    captcha:string;
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
const validateCaptcha = async (inputCaptcha: string): Promise<boolean> => {
  try {
    const session = await auth();
    // 验证session是否存在以及是否包含验证码
    if (!session?.captcha) {
      //如果session中不存在captcha
      console.log('未正确生成captcha');
      return false;
    }
    // 不区分大小写比较验证码
    return inputCaptcha.toLowerCase() === session.captcha.toLowerCase();
  } catch (error) {
    console.error('验证码验证失败:', error);
    return false;
  }
};

export const authConfig = {
  pages: {
    signIn: '/login', // 自定义登录页面路径
  },
  adapter: PrismaAdapter(db),
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
        captcha: {
          label: 'Captcha',
          type: 'text',
        },
      },
      async authorize(credentials) {
        const parsedCredentials = z
          .object({
            email: z.string().email(),
            password: z.string().min(6),
            captcha: z.string().length(4),
          })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;

        const { email, password, captcha } = parsedCredentials.data;

        // 验证验证码是否正确
        // 这里需要根据您的具体实现来验证验证码
        // 例如，从 session 中获取正确的验证码进行比对
        const isValidCaptcha = await validateCaptcha(captcha);
        if (!isValidCaptcha) return null;

        const user = await db.user.findUnique({
          where: { email },
        });
        if (!user?.password) return null;

        const passwordsMatch =
          await bcrypt.compare(
            password,
            user.password,
          );
        if (!passwordsMatch) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
    //也可以使用数据库策略
    //但是如果是oauth和credentials共存的话建议使用jwt
    maxAge: 24 * 60 * 60, // 24小时，单位是秒
  },

  jwt: {
    maxAge: 60 * 60, // JWT token过期时间
  },
} satisfies NextAuthConfig;
