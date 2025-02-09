import { PrismaAdapter } from '@auth/prisma-adapter';
import {
  type DefaultSession,
  type NextAuthConfig,
} from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import bcrypt from 'bcryptjs';

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
      },
      async authorize(credentials) {
        const parsedCredentials = z
          .object({
            email: z.string().email(),
            password: z.string().min(6),
          })
          //验证是否为有效的邮件格式
          //验证密码是否至少为6个字符
          .safeParse(credentials);
        //如果验证成功parsedCredentials.success为true 的值将为true否则将为false
        if (!parsedCredentials.success)
          return null;

        const { email, password } =
          parsedCredentials.data;

        //使用parsedCredentials.data可以得到验证后的数据
        const user = await db.user.findUnique({
          where: { email },
        });
        //使用await db.user.findUnique({ where: { email } }) 查询数据库中是否存在具有给定电子邮件的用户
        //如果用户存在，则将用户数据存储在user变量中
        //如果用户不存在，则将user设置为null
        if (!user?.password) return null;
        //如果用户不存在密码，则返回null

        const passwordsMatch =
          await bcrypt.compare(
            password,
            user.password,
          );
        if (!passwordsMatch) return null;
        //如果密码不匹配，则返回null
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
