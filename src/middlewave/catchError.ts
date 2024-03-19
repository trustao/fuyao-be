import {Context} from "koa";
import {responseWrap} from "../util";
import logger from "../util/logger";
import {AppResponseCode} from "../util/errors";


export const catchError = async (ctx: Context, next: () => Promise<any>) => {
  try {
    await next()
  } catch (e: any) {
    logger.error(e);
    ctx.body = responseWrap({message: e.message, stack: e.stack}, AppResponseCode.ServerError)
  }
}
