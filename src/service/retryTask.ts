import {RetryTask, TaskStatus} from "../models/RetryTask";
import {Op} from "sequelize";
import {getOrder} from "./order";
import {getLogisticsById} from "./logistics";
import {tryNotification} from "./notification";
import logger from "../util/logger";
import {Order} from "../models/Order";
import {Logistics} from "../models/Logistics";


export class RetryQueueManage {

  isStop = true;
  list: RetryTask[] = [];
  timer: any;
  interval = 10000

  start() {
    this.isStop = false;
    this.syncQueueList().then(list => logger.log('Sync Queue Complete', `Run Task Count ${list.length}`));
    this.timer = setTimeout(() => !this.isStop && this.start(), this.interval)
  }

  stop() {
    this.isStop = true;
  }

  destroy() {
    clearTimeout(this.timer);
  }

  private async syncQueueList() {
    this.list = await RetryTask.findAll({
      where: {
        status: {
          [Op.not]: TaskStatus.WaitRetry
        },
        next_retry_time: {
          [Op.gte]: new Date()
        }
      }
    })
    return await Promise.allSettled(this.list.map(item => this.runOne(item)))
  }

  private async runOne(task: RetryTask) {
    logger.log('Run Task', task.toJSON());
    const order = await getOrder(task.order_id)
    const logistic = await getLogisticsById(task.logistics_id)
    try {
      const noti = await tryNotification(order, logistic)
      if (!noti) {
        await task.destroy()
      } else {
        await task.update({
          status: TaskStatus.OnCalling,
          retry_count: task.retry_count + 1
        })
      }
    } catch (e) {
      logger.error(e)
    }
  }

}

export async function addTask(order: Order, logistics: Logistics, nextTime: Date) {
  return await RetryTask.create({
    order_id: order.order_id,
    logistics_id: logistics.id,
    retry_count: 0,
    next_retry_time: nextTime,
    status: TaskStatus.WaitRetry
  })
}
