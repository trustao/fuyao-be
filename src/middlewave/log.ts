import {Context, Next} from "koa";
import logger from "../util/logger";


export const logTime = async (ctx: Context, next: Next) => {
  const now = Date.now();
  await next();
  logger.log(`[${ctx.method}] ${ctx.url} ${Date.now() - now}ms`);
}
