import {Sequelize} from 'sequelize'
import logger from "./logger";

const sequelize = new Sequelize({
  database: 'eb_base',
  username: '',
  password: '',
  host: 'localhost',
  dialect: 'mysql'
});


async function checkDbAuth() {
  try {
    await sequelize.authenticate()
    logger.log('DB 链接成功')
    return true
  } catch (e) {
    logger.log('DB 失败')
    logger.error(e);
    return false
  }
}

checkDbAuth().catch();

export default sequelize
