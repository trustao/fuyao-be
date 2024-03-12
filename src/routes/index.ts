import Router from "@koa/router";
import {getOrderNotificationList, sendSMS} from "../service/orderNotification";
import {responseWrap} from "../util";

const router = new Router();


router.get('/', (ctx, next) => {
  // ctx.router available

  ctx.body = 'ok'
});

router.get('/orders', async (ctx) => {
  const list = await getOrderNotificationList();
  ctx.body = responseWrap(list)
})

router.post('/orderNotification', async (ctx) => {
  console.log(ctx.req)
  ctx.body = 'ok'
})

router.get('/sendTest', async ctx => {
  ctx.body = await sendSMS()
})

export default router
