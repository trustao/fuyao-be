import Router from "@koa/router";
import {responseWrap} from "../util";
import {getPublicKey} from "../util/encode";
import auth from "./auth";
import user, {adminRouter} from "./user";
import logistics from "./logistics";
import notification from "./notification";
import order from "./order";
import {adminAuth, apiAuth} from "../middlewave/auth";
import stats from "./stats";

const router = new Router();

router
  .use(auth.routes())
  .use(apiAuth)
  .use(logistics.routes())
  .use(notification.routes())
  .use(order.routes())
  .use(user.routes())
  .use(stats.routes)

router
  .use(adminAuth)
  .use(adminRouter.routes)

router.get('/__test_api', async ctx => {
  const apiList = router.stack.map(i => i.methods.length && typeof i.path === 'string' ? i.path.replace(/\(.*?\)/ig, '') : null).filter(i => i?.startsWith('/fy/api'));
  await ctx.render('test', {key: getPublicKey(), apiList: apiList})
})

router.get('/', (ctx, next) => {
  // ctx.router available

  ctx.body = 'ok'
});


export default router
