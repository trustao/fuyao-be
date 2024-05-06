import sequelize, {checkDbAuth} from "./util/db";
import logger from "./util/logger";
import './models'

export async function syncAll() {
  try {
    await checkDbAuth();
    await sequelize.sync({alter: true})
    logger.log('DB同步成功');
  } catch (e) {
    logger.error(e)
  }
}

syncAll().catch();
