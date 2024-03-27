import {Order} from "../models/Order";
import {Logistics} from "../models/Logistics";
import {Attributes, or} from "sequelize";
import {Notification, NotificationStatus, NotificationType} from "../models/Notification";
import {CreationAttributes} from "sequelize/types/model";

export interface NotificationConfig {
  type: NotificationType;
  use_phone: string;
  template_id: string;
  params: string
}

export async function tryNotification(order: Order, logistics: Logistics): Promise<Notification | null> {

  const needSend = await checkNeedNotification(order, logistics)
  if (!needSend) {
    return null
  }
  const config = await getNotificationConfig(order, logistics);
  const data = await sendNotification(config);
  return await addNotificationRecord({...config, order_id: order.order_id, logistics_id: logistics.id, call_id: data.callId})
}

export async function checkNeedNotification(order: Order, logistics: Logistics): Promise<boolean> {
  // todo 判断是否需要发送
  const lastNoti = await getLastNotification(order.order_id, logistics.id)
  return true;
}

export async function getNotificationConfig(order: Order, logistics: Logistics): Promise<NotificationConfig> {
  // todo
  return {
    type: NotificationType.SMS,
    use_phone: order.user_phone,
    template_id: '11111',
    params: JSON.stringify({product: order.product_name, 'a': 'bbbbbbb'})
  }
}

export async function getLastNotification(orderId: string, logisticsId: number) {
  return await Notification.findOne({
    where: {
      order_id: orderId,
      logistics_id: logisticsId
    },
    order: [
      ['createdAt', 'DESC']
    ]
  })
}

export async function addNotificationRecord(params: Partial<CreationAttributes<Notification>>) {
  return await Notification.create({
    order_id: params.order_id!,
    logistics_id: params.logistics_id!,
    type: params.type!,
    use_phone: params.use_phone!,
    template_id: params.template_id!,
    params: params.params!,
    status: NotificationStatus.Pending
  })
}

export async function sendNotification(config: NotificationConfig): Promise<{callId: string}> {
  // todo 发送通知

  return {
    callId: ''
  }
}
