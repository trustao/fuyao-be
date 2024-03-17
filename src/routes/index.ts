import Router from "@koa/router";
import {responseWrap} from "../util";

const router = new Router();


router.get('/', (ctx, next) => {
  // ctx.router available

  ctx.body = 'ok'
});

// router.get('/sendTest', async ctx => {
//   ctx.body = await sendSMS()
// })

export default router
