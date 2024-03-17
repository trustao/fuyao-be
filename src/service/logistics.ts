import {Logistics} from "../models/Logistics";
import {Order, OrderStatus} from "../models/Order";
import {describeLogisticInfo, getLogisticInfo, LogisticsRes} from "../third/kuaidiniao";
import moment from "moment";
import {logisticsStateIsCompleted} from "../util/logisticsState";
import {over7Days} from "../util";
import logger from "../util/logger";
import {getShipperCode} from "../util/logisticsCode";


export async function queryLogistics(order: Order) {
  if (!order.logistics_code) {
    throw new Error('订单号码不存在')
  }
  if (logisticsStateIsCompleted(order.logistics_status)) {
    logger.log(`订单${order.order_id} 物流已完结${order.logistics_status}`);
    return;
  }
  if (order.described) {
    const logistic = await getLastLogisticsByOrderId(order.order_id);
    if (logistic) {
      if (logisticsStateIsCompleted(logistic.logistics_status)) {
        logger.log(`订单${order.order_id} 物流已完结${logistic.logistics_status}`);
        await order.updateData({
          logistics_status: logistic.logistics_status,
          status_update_at: moment(logistic.logistics_time).toDate(),
          described: false,
          status: OrderStatus.Completed
        })
        return;
      }
      if (!over7Days(logistic.logistics_time)) {
        logger.log(`订单${order.order_id} 物流已完结${logistic.logistics_status}`);
        return;
      }
    }
    if (!logistic && !over7Days(order.describe_at)) {
      logger.log(`订单${order.order_id}订阅时间${moment(order.describe_at).format('YYYY-MM-DD HH:mm:ss')}，暂无物流信息，等待推送。`);
      return;
    }
  }
  const lInfo = await getLogisticInfo(order.logistics_code, order.logistics_company)
  if (!lInfo.Success) {
    throw new Error(`查询快递信息失败\n${JSON.stringify(lInfo)}`)
  }
  const status = lInfo.StateEx || lInfo.State;
  // todo 检查是否需要通知？
  if (logisticsStateIsCompleted(status)) {
    logger.log(`订单${order.order_id} 物流已完结${lInfo.StateEx}`);
    await order.updateData({
      logistics_status: status,
      status_update_at: moment(lInfo.Traces?.[lInfo.Traces.length - 1]?.AcceptTime).toDate(),
      described: false,
      status: OrderStatus.Completed
    })
    return;
  }

  const res = await describeLogisticInfo(lInfo.ShipperCode, lInfo.LogisticCode)
  if (res.Success) {
    logger.log(`订单${order.order_id}订阅物流信息成功`)
    await order.updateData({described: true, shipper_code: lInfo.ShipperCode})
  } else {
    throw new Error(`订单${order.order_id}订阅物流信息失败\n${JSON.stringify(res)}`)
  }
}

export async function addLogistics(orderId: string, params: LogisticsRes) {
  return Logistics.create({
    order_id: orderId,
    logistics_info: JSON.stringify(params),
    logistics_status: params.StateEx || params.State,
    logistics_code: params.LogisticCode,
    logistics_time: moment(params.Traces?.[params.Traces.length - 1]?.AcceptTime).toDate()
  })
}

export async function getLogisticsById(id: string) {
  return Logistics.findOne({where: {id}})
}

export async function hasLogistics(orderId: string) {
  const count = await Logistics.count({where: {order_id: orderId}})
  return count > 0
}

export async function getLastLogisticsByOrderId(orderId: string) {
  return Logistics.findOne({
    where: {order_id: orderId},
    order: [
      ['logistics_time', 'DESC']
    ]
  })
}

export async function getAllLogisticsByOrderId(orderId: string) {
  return Logistics.findAll({where: {order_id: orderId}})
}

