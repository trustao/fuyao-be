import {Context, Next} from "koa";
import logger from "../util/logger";
import {responseWithCode, responseWrap} from "../util";
import {AppResponseCode} from "../util/errors";

const whiteList = process.env.IP_WIHTE_LIST?.split(',').map(i => i.trim()) || [];
const blackList = process.env.IP_BLACK_LIST?.split(',').map(i => i.trim()) || [];

export async function IpAccessControl(ctx: Context, next: Next) {
  const ip = ctx.ips?.length ? ctx.ips[ctx.ips.length - 1] : ctx.ip;
  if (whiteList.length) {
    if (whiteList.includes(ip)) {
      await next();
    } else {
      logger.log(`IP: ${ip} 不在白名单中`)
      ctx.body = responseWithCode(AppResponseCode.Forbidden)
    }
    return;
  }

  if (blackList.length) {
    if (blackList.includes(ip)) {
      logger.log(`IP: ${ip} 在黑名单中`)
      ctx.body = responseWithCode(AppResponseCode.Forbidden)
    } else {
      await next();
    }
    return
  }

  await next();
}


export async function IpFrequencyControl(duration: number, count: number) {
  const store: Record<string, number[]> = {};
  return async (ctx: Context, next: Next) => {
    const ip = ctx.ips?.length ? ctx.ips[ctx.ips.length - 1] : ctx.ip;
    const now = Date.now();
    const time = now - duration;
    const accessList = store[ip] = (store[ip] || []).filter(i => i >= time);
    if (accessList.length >= count) {
      logger.log(`IP: ${ip} 访问受限`)
      ctx.body = responseWithCode(AppResponseCode.Forbidden)
    } else  {
      accessList.push(now);
      await next();
    }
  }
}
