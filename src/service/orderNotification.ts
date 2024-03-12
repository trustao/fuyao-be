import {OrderNotification} from "../models/OrderNotification";
import SmsClient from '../third/aliyunSMS'

export async function getOrderNotificationList(offset = 0, limit = 20) {
  const list = await OrderNotification.findAll({offset, limit})
  return list.map(i => i.toJSON())
}

export async function sendSMS() {
  return await SmsClient.main('7878')
}
