import 'dotenv/config'
import Koa from 'koa';
import bodyParser from '@koa/bodyparser';
import cors from 'koa-cors';
import logger from "./util/logger";
import router from "./routes";
import './sync-script';
import {catchError} from "./middlewave/catchError";
import {apiAuth} from "./middlewave/auth";
import {logTime} from "./middlewave/log";
import order from "./routes/order";
import notification from "./routes/notification";
import logistics from "./routes/logistics";
import {IpAccessControl} from "./middlewave/ip";
import auth from "./routes/auth";
import {bodyDecode} from "./middlewave/decode";
import user from "./routes/user";


const app = new Koa();
const host = process.env.APP_HOST || '0.0.0.0';
const port = Number(process.env.APP_PORT) || 3000

app.use(cors());
app.use(logTime)
app.use(catchError)
app.use(IpAccessControl)
app.use(bodyParser({
  enableTypes: ['json', 'form', "text"],
  encoding: 'utf-8'
}))
app.use(bodyDecode)

app.use(auth.routes())

app.use(apiAuth)

app
  .use(order.routes())
  .use(logistics.routes())
  .use(notification.routes())
  .use(user.routes())
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(port, host, () => {
  logger.log(`Server Start http://${host}:${port}`)
})
