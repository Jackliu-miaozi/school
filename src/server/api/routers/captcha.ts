import { publicProcedure, createTRPCRouter } from '@/server/api/trpc';
import svgCaptcha from 'svg-captcha';

export const captchaRouter = createTRPCRouter({
  getCaptcha: publicProcedure.query(async () => {
    const svg = svgCaptcha.create();
    return svg;
  }),
});
