import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { hash } from 'bcryptjs';
import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';

export const registerRouter = createTRPCRouter({
  register: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(6),
        name: z.string().min(2),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const exists = await ctx.db.user.findUnique({
        where: { email: input.email },
      });

      if (exists) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: '该邮箱已被注册',
        });
      }

      const hashedPassword = await hash(input.password, 12);

      return ctx.db.user.create({
        data: {
          email: input.email,
          password: hashedPassword,
          name: input.name,
        },
      });
    }),
});
