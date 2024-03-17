import Router from "@koa/router";
import {responseWrap} from "../util";
import {saveOrderInfo} from "../service/order";
import {queryLogistics} from "../service/logistics";

const router = new Router({prefix: '/api/order'});


router.post('/info', async (ctx, next) => {
  // ctx.router available
  const order = await saveOrderInfo(ctx.request.body)
  await queryLogistics(order);
  ctx.body = responseWrap(order.toJSON())
});

export default router
