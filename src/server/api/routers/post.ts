import {
  publicProcedure,
  createTRPCRouter,
  protectedProcedure,
} from '@/server/api/trpc';

export const postRouter = createTRPCRouter({
  getLatest: protectedProcedure.query(async ({ ctx }) => {
    const post = await ctx.db.post.findFirst({
      orderBy: { createdAt: 'desc' },
      where: { createdBy: { id: ctx.session.user.id } },
    });

    return post ?? null;
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return 'you can now see this secret message!';
  }),
  getAllPublic: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.post.findMany();
  }),
});
