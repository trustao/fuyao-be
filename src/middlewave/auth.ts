import {Context, Next} from "koa";

export const apiAuth = async (ctx: Context, next: Next) => {
  await next()
}
