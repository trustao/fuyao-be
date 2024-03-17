import {Order, OrderParams} from "../models/Order";
import {Attributes} from "sequelize";
import logger from "../util/logger";
import {toParams} from "../util";


export function createOrder(orderData: Partial<Attributes<Order>> & {order_id: string}) {
  return Order.create({
    order_id: orderData.order_id,
    status: 0,
    described: false,
    user_phone: orderData.user_phone,
    logistics_code: orderData.logistics_code,
    logistics_company: orderData.logistics_company,
    logistics_status: orderData.logistics_status,
    shipper_code: orderData.shipper_code,
    operator_phone: orderData.operator_phone,
    account: orderData.account,
    product_name: orderData.product_name,
    status_update_at: orderData.status_update_at
  })
}

export function getOrder(orderId: string) {
  return Order.findOne({where: {order_id: orderId}})
}

export function getOrderByLogisticsCode(logisticsCode: string) {
  return Order.findOne({where: {logistics_code: logisticsCode}})
}

export async function saveOrderInfo(params: OrderParams) {
  logger.log('Params: ', params)
  const order = await getOrder(params.order_id)
  if (!order) {
    return await createOrder(params)
  }
  await order.updateData(params);
  return order
}

export function getOrderParams(data: any) {
  return toParams<OrderParams>([
    'order_id',
    'account',
    'operator_phone',
    'product_name',
    'user_phone',
    'logistics_code',
    'logistics_company',
  ], data)
}
