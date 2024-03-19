import Router from "@koa/router";
import {responseWithCode, responseWrap} from "../util";
import {checkAuth, login, sendVerifyCode} from "../service/auth";
import {IpFrequencyControl} from "../middlewave/ip";
import {AppResponseCode} from "../util/errors";
import {SESSION_KEY} from "../models/Authentication";

const router = new Router({prefix: '/api/auth'});

// @ts-ignore
router.use(IpFrequencyControl(1000, 2))

router.post('/login', async (ctx, next) => {
  // ctx.router available
  const auth = await login(ctx.request.body);
  ctx.cookies.set(SESSION_KEY, auth.code)
  ctx.body = responseWrap({success: true})
});

router.post('/code', async (ctx, next) => {
  await sendVerifyCode(ctx.request.body.phone)
  ctx.body = responseWrap('发送成功')
})

router.get('/check', async ctx => {
  const code = ctx.cookies.get(SESSION_KEY);
  if (!code || !(await checkAuth(code))) {
    ctx.body = responseWithCode(AppResponseCode.Unauthorized)
  } else {
    ctx.body = responseWithCode(AppResponseCode.OK)
  }
})

export default router
