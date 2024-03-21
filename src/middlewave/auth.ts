import {Context, Next} from "koa";
import {SESSION_KEY} from "../models/Authentication";
import {checkAuth} from "../service/auth";
import {responseWithCode} from "../util";
import {AppResponseCode} from "../util/errors";
import logger from "../util/logger";

export const apiAuth = async (ctx: Context, next: Next) => {
  if (ctx.url.startsWith('/api')) {
    const code = ctx.cookies.get(SESSION_KEY);
    if (!code || !(await checkAuth(code, ctx))) {
      ctx.body = responseWithCode(AppResponseCode.Unauthorized)
      return;
    }
    logger.log('CheckAuth Success', ctx.user.toJSON())
  }
  await next()
}
