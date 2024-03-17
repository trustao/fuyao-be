import {checkDbAuth} from "./util/db";
import logger from "./util/logger";
import './models'
import {asyncTables} from "./models";

export async function syncAll() {
  try {
    await checkDbAuth();
    await asyncTables();
    logger.log('DB同步成功');
  } catch (e) {
    logger.error(e)
  }
}

syncAll().catch();
