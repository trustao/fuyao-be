import Router from "@koa/router";
import {responseWrap} from "../util";
import {getPublicKey} from "../util/encode";
import auth from "./auth";
import user from "./user";
import logistics from "./logistics";
import notification from "./notification";
import order from "./order";
import {apiAuth} from "../middlewave/auth";

const router = new Router();

router
  .use(auth.routes())
  .use(apiAuth)
  .use(logistics.routes())
  .use(notification.routes())
  .use(order.routes())
  .use(user.routes())

router.get('/__test_api', async ctx => {
  const apiList = router.stack.map(i => i.methods.length && typeof i.path === 'string' ? i.path.replace(/\(.*?\)/ig, '') : null).filter(i => i?.startsWith('/fy/api'));
  await ctx.render('test', {key: getPublicKey(), apiList: apiList})
})

router.get('/', (ctx, next) => {
  // ctx.router available

  ctx.body = 'ok'
});

// router.get('/sendTest', async ctx => {
//   ctx.body = await sendSMS()
// })

export default router
