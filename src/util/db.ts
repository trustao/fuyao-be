import {Sequelize} from 'sequelize'
import logger from "./logger";

const sequelize = new Sequelize({
  database: process.env['DATABASE'],
  username: process.env['DB_USER'],
  password: process.env['DB_PASSWORD'],
  host: process.env['DB_HOST'],
  port: Number(process.env['DB_PORT']),
  dialect: 'mysql'
});


export async function checkDbAuth() {
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

export default sequelize
