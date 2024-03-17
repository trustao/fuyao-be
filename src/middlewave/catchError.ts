import {Context} from "koa";
import {responseWrap} from "../util";
import logger from "../util/logger";


export const catchError = async (ctx: Context, next: () => Promise<any>) => {
  try {
    await next()
  } catch (e: any) {
    logger.error(e);
    ctx.body = responseWrap({message: e.message, stack: e.stack}, 1)
  }
}
