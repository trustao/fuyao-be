import Router from "@koa/router";
import {isEmpty, objIsNotEmpty, responseWithCode, responseWrap, toParams} from "../util";
import {AppResponseCode} from "../util/errors";
import {Role, User} from "../models/User";
import logger from "../util/logger";

const router = new Router();

router.get('/api/user/me', ctx => {
  ctx.body = responseWrap(toParams(['id', 'phone', 'username', 'role'], ctx.user))
})

router.use(async (ctx, next) => {
  if (ctx.user?.role !== Role.ADMIN) {
    logger.log('未授权用户访问' + JSON.stringify(ctx.user?.toJSON() || {}))
    ctx.body = responseWithCode(AppResponseCode.Forbidden)
  } else {
    await next()
  }
})

router.get('/api/user/list', async ctx => {
  const {offset = 0, limit = 20} = ctx.query
  const list = await User.findAll({
    where: {
      role: Role.Operator
    },
    order: [
      ['id', 'DESC']
    ],
    offset: +offset,
    limit: +limit
  })
  ctx.body = responseWrap(list.map(i => toParams(['id', 'phone', 'username', 'status'], i)))
})

router.get('/api/user', async ctx => {
  if (!isEmpty(ctx.query.id)) {
    const user = await User.findByPk(+ctx.query.id!)
    if (user) {
      ctx.body = responseWrap(toParams(['id', 'phone', 'username', 'role'], user))
      return
    }
  }
  ctx.body = responseWrap(null)
})

router.post('/api/user', async (ctx, next) => {
  // ctx.router available
  const params = ctx.request.body;
  if (objIsNotEmpty(params, {includes: ['phone']})
    || objIsNotEmpty(params, {includes: ['username', 'password']})
  ) {
    const user = await User.create({
      phone: params.phone,
      username: params.username,
      password: params.password
    });
    ctx.body = responseWithCode(AppResponseCode.OK);
  } else {
    ctx.body = responseWithCode(AppResponseCode.ParamsError)
  }
});

router.put('/api/user', async (ctx, next) => {
  const params = toParams(['id', 'status', 'phone', 'username', 'password'], ctx.request.body, true);
  if (params.id) {
    const user = await User.findByPk(params.id);
    if (user && user.role !== Role.ADMIN) {
      await user.update(params);
      ctx.body = responseWithCode(AppResponseCode.OK)
      return;
    }
  }
  ctx.body = responseWithCode(AppResponseCode.ParamsError)
})

router.delete('/api/user', async ctx => {
  if (!isEmpty(ctx.query.id)) {
    const user = await User.findByPk(+ctx.query.id!)
    if (user) {
      await user.destroy();
      ctx.body = responseWithCode(AppResponseCode.OK)
      return
    }
  }
  ctx.body = responseWithCode(AppResponseCode.ParamsError)
})



export default router
