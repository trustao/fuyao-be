import Koa from 'koa';
import logger from "./util/logger";
import router from "./routes";


const app = new Koa();
const host = process.env.APP_HOST || '0.0.0.0';
const port = Number(process.env.APP_PORT) || 3000


app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(port, host, () => {
  logger.log(`Server Start http://${host}:${port}`)
})
