import {Notification} from './Notification'
import {Logistics} from './Logistics'
import {Order} from './Order'
import {RetryQueue} from './RetryQueue'
import {User} from "./User";
import {Authentication} from "./Authentication";

export async function asyncTables(force = false) {
  await User.sync({force});
  await Authentication.sync({force});
  await Notification.sync({force});
  await Logistics.sync({force});
  await Order.sync({force});
  await RetryQueue.sync({force})
}
