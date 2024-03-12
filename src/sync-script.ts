import {checkDbAuth} from "./util/db";
import logger from "./util/logger";
import {sync as orderSync} from './models/OrderNotification'

export async function syncAll() {
  try {
    await checkDbAuth();
    await orderSync();
  } catch (e) {
    logger.error(e)
  }
}

syncAll().catch();
