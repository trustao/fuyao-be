import Router from "@koa/router";
import {isNotEmpty, responseWithCode, responseWrap} from "../util";
import {checkAuth, login, sendVerifyCode} from "../service/auth";
import {AppResponseCode} from "../util/errors";
import {SESSION_KEY} from "../models/Authentication";
import {Role} from "../models/User";
import logger from "../util/logger";

const router = new Router();

router.use(async (ctx, next) => {
  if (ctx.user?.role !== Role.ADMIN) {
    logger.log('未授权用户访问' + JSON.stringify(ctx.user?.toJSON() || {}))
    ctx.body = responseWithCode(AppResponseCode.Forbidden)
  } else {
    await next()
  }
})

router.post('/api/user', async (ctx, next) => {
  // ctx.router available
  if (isNotEmpty(ctx.request.body, {includes: ['phone']})
    || isNotEmpty(ctx.request.body, {includes: [, 'username', 'password']})) {
   // 创建
  }
});

export default router
