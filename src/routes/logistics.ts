import Router from "@koa/router";
import {responseWrap} from "../util";
import {getOrderByLogisticsCode, saveOrderInfo} from "../service/order";
import {addLogistics, getAllLogisticsByOrderId, queryLogistics} from "../service/logistics";
import {LogisticsRes, PushedLogisticsData} from "../third/kuaidiniao";
import logger from "../util/logger";
import {checkNeedNotification} from "../service/notification";

const router = new Router();


router.get('/logistics/callback', async (ctx, next) => {
  // ctx.router available
  const body = ctx.request.body as PushedLogisticsData;
  logger.log(`推送物流数据：${JSON.stringify(body)}`);
  if (body.Data?.length) {
    Promise.allSettled(body.Data.map(async item => {
      const order = await getOrderByLogisticsCode(item.LogisticCode);
      if (!order) {
        logger.error(`快递${item.LogisticCode} 订单不存在\n${JSON.stringify(item)}`)
        return;
      }
      const logistics = await addLogistics(order.order_id, item)
      await checkNeedNotification(order, logistics)
    }))
  }
  ctx.body = {
    "EBusinessID": "1237100",
    "UpdateTime": "2015-03-11 16:26:11",
    "Success": true,
    "Reason": ""
  }
});

router.get('/api/logistics/list', async ctx => {
  const list = await getAllLogisticsByOrderId(ctx.request.query.order_id as string)
  ctx.body = responseWrap(list);
})

export default router