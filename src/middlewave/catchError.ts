import {Context} from "koa";
import {responseWrap} from "../util";


export const catchError = async (ctx: Context, next: () => Promise<any>) => {
  try {
    await next()
  } catch (e: any) {
    ctx.body = responseWrap({message: e.message, stack: e.stack}, 1)
  }
}