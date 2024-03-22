import {Context, Next} from "koa";
import logger from "../util/logger";


export const logTime = async (ctx: Context, next: Next) => {
  const now = Date.now();
  const ip = ctx.ips.length > 0 ? ctx.ips[ctx.ips.length - 1] : ctx.ip;
  await next();
  logger.log(`[M:${ctx.method}] [I:${ip}] ${ctx.url} ${Date.now() - now}ms`);
}
