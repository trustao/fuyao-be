import {Notification} from './Notification'
import {Logistics} from './Logistics'
import {Order} from './Order'
import {RetryTask} from './RetryTask'
import {User} from "./User";
import {Authentication} from "./Authentication";
import {ShopMetrics} from './ShopMetrics'

export async function asyncTables(force = false) {
  await User.sync({force});
  await Authentication.sync({force});
  await Notification.sync({force});
  await Logistics.sync({force});
  await Order.sync({force});
  await RetryTask.sync({force})
  await ShopMetrics.sync({force})
}
