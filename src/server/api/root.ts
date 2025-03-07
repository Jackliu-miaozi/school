import { postRouter } from '@/server/api/routers/post';
import { registerRouter } from '@/server/api/routers/register';
// import { captchaRouter } from '@/server/api/routers/captcha';

import {
  createCallerFactory,
  createTRPCRouter,
} from '@/server/api/trpc';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  register: registerRouter,
  // captcha: captchaRouter,
});
//createTRPCRouter 创建一个tRPC路由器
//appRouter 是包含所有路由器的根路由器

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller =
  createCallerFactory(appRouter);
//createCallerFactory 创建一个服务器端调用器工厂函数
//appRouter 是包含所有路由器的根路由器
//createCaller 是createCallerFactory的调用结果，用于创建实际的调用器
