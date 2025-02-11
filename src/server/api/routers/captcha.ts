import { publicProcedure, createTRPCRouter } from '@/server/api/trpc';
import svgCaptcha from 'svg-captcha';

export const captchaRouter = createTRPCRouter({
  getCaptcha: publicProcedure.query(({ ctx }) => {
    const captcha = svgCaptcha.create({
      size: 4,
      ignoreChars: '0o1i',
      color: true,
      noise: Math.floor(Math.random() * 5),
      width: 100,
      height: 40,
    });
    if (ctx.session) {
      // 将验证码文本存储在session中
      ctx.session.captcha = captcha.text;

      // 只返回验证码图片，不返回文本
      return {
        image: captcha.data,
      };
    }
  }),
});
