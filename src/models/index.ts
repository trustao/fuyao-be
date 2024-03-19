import {Notification} from './Notification'
import {Logistics} from './Logistics'
import {Order} from './Order'
import {RetryQueue} from './RetryQueue'
import {User} from "./User";

export async function asyncTables() {
  await User.sync();
  await Notification.sync();
  await Logistics.sync();
  await Order.sync();
  await RetryQueue.sync()
}
