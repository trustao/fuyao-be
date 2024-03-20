import Router from "@koa/router";
import {responseWithCode, responseWrap} from "../util";
import {login, sendVerifyCode} from "../service/auth";
import {IpFrequencyControl} from "../middlewave/ip";
import {AppResponseCode} from "../util/errors";
import {SESSION_KEY} from "../models/Authentication";
import logger from "../util/logger";

const router = new Router({prefix: '/api/auth'});

router.post('/login', async (ctx, next) => {
  // ctx.router available
  try {
    const auth = await login(ctx.request.body);
    ctx.cookies.set(SESSION_KEY, auth.code)
    ctx.body = responseWrap('登录成功')
  } catch (e: any) {
    logger.error(e);
    ctx.body = responseWithCode(AppResponseCode.Unauthorized, e?.message)
  }

});

router.use(IpFrequencyControl(1000, 1))

router.post('/code', async (ctx, next) => {
  await sendVerifyCode(ctx.request.body.phone)
  ctx.body = responseWrap('发送成功')
})

export default router
