import 'dotenv/config'
import Koa from 'koa';
import bodyParser from '@koa/bodyparser';
import logger from "./util/logger";
import router from "./routes";
// import './sync-script';
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
import render from 'koa-ejs'
import path from "path";


const app = new Koa({proxy: true});
const host = process.env.APP_HOST || '0.0.0.0';
const port = Number(process.env.APP_PORT) || 3000

render(app, {
  root: path.join(__dirname, 'template'),
  layout: false,
  viewExt: 'html',
})
app.use(logTime)
app.use(catchError)
app.use(IpAccessControl)
app.use(bodyParser({
  enableTypes: ['json', 'form', "text"],
  encoding: 'utf-8',
}))
app.use(bodyDecode)

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(port, host, () => {
  logger.log(`Server Start http://${host}:${port}`)
})
