import Router from "@koa/router";
import {isEmpty, objIsNotEmpty, responseWithCode, responseWrap, toParams} from "../util";
import {AppResponseCode} from "../util/errors";
import {Role, User} from "../models/User";
import {adminAuth} from "../middlewave/auth";

const router = new Router({prefix: '/fy'});

router.get('/api/user/me', ctx => {
  ctx.body = responseWrap(toParams(['id', 'phone', 'username', 'role'], ctx.user))
})


export const adminRouter = new Router({prefix: '/fy'});


adminRouter.use(adminAuth)
adminRouter.get('/api/user/list', async ctx => {
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

adminRouter.get('/api/user', async ctx => {
  if (!isEmpty(ctx.query.id)) {
    const user = await User.findByPk(+ctx.query.id!)
    if (user) {
      ctx.body = responseWrap(toParams(['id', 'phone', 'username', 'role'], user))
      return
    }
  }
  ctx.body = responseWrap(null)
})

adminRouter.post('/api/user', async (ctx, next) => {
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

adminRouter.put('/api/user', async (ctx, next) => {
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

adminRouter.delete('/api/user', async ctx => {
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

adminRouter.post('/api/user/patchCreate', async ctx => {
  const params = ctx.request.body;
  if (Array.isArray(params)) {
    await User.bulkCreate(params.map(i => ({
      phone: i.phone,
      username: i.username,
      password: i.password
    })))
    ctx.body = responseWithCode(AppResponseCode.OK)
  } else {
    ctx.body = responseWithCode(AppResponseCode.ParamsError)
  }
})

export default router
