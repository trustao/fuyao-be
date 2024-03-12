import 'dotenv/config'
import Koa from 'koa';
import logger from "./util/logger";
import router from "./routes";
import './sync-script';
import {catchError} from "./middlewave/catchError";
import {apiAuth} from "./middlewave/auth";
import {logTime} from "./middlewave/log";

console.log(process.env);

const app = new Koa();
const host = process.env.APP_HOST || '0.0.0.0';
const port = Number(process.env.APP_PORT) || 3000

app.use(logTime)
app.use(catchError)
app.use(apiAuth)

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(port, host, () => {
  logger.log(`Server Start http://${host}:${port}`)
})
