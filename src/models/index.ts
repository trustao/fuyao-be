import {Notification} from './Notification'
import {Logistics} from './Logistics'
import {Order} from './Order'
import {RetryQueue} from './RetryQueue'

export async function asyncTables() {
  await Notification.sync();
  await Logistics.sync();
  await Order.sync();
  await RetryQueue.sync()
}
