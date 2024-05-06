import Router from "@koa/router";
import {ShopMetrics} from "../models/ShopMetrics";
import {responseWithCode, responseWrap} from "../util";
import {AppResponseCode} from "../util/errors";
import moment from "moment";
import {Op} from "sequelize";


const router = new Router({prefix: '/fy/api'});


router.post('/shopMetrics/upload', async (ctx, next) => {
  await ShopMetrics.bulkCreate(ctx.request.body)
  ctx.body = responseWithCode(AppResponseCode.OK)
});

router.post('/shopMetrics/list',async (ctx, next) => {
  const {limit = 20, offset = 0, start = moment().subtract(7, 'days').valueOf(), end = moment().valueOf()} = ctx.request.body || {};
  const res = await ShopMetrics.findAndCountAll({
    where: {
      date: {
        [Op.gte]: moment(start).toDate(),
        [Op.lte]: moment(end).toDate()
      }
    },
    limit,
    offset
  })
  ctx.body = responseWrap(res)
});

export default router
