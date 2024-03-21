import Router from "@koa/router";
import {responseWrap} from "../util";
import {getOrderByLogisticsCode, saveOrderInfo} from "../service/order";
import {addLogistics, getAllLogisticsByOrderId, queryLogistics} from "../service/logistics";
import {LogisticsRes, PushedLogisticsData} from "../third/kuaidiniao";
import logger from "../util/logger";
import {checkNeedNotification} from "../service/notification";

const router = new Router({prefix: '/fy'});


router.get('/notification/vms/callback', async (ctx, next) => {
  // ctx.router available
  // todo
});



export default router
