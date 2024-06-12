import {Context, Next} from "koa";
import logger from "../util/logger";
import {responseWithCode, responseWrap} from "../util";
import {AppResponseCode} from "../util/errors";

const whiteList = process.env.IP_WHITE_LIST?.split(',').map(i => i.trim()) || [];
const blackList = process.env.IP_BLACK_LIST?.split(',').map(i => i.trim()) || [];
const ignoreList = process.env.IP_FREQUENCY_IGNORE?.split(',').map(i => i.trim()) || [];

export async function IpAccessControl(ctx: Context, next: Next) {
  const ip = ctx.ip;
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


export function IpFrequencyControl(duration: number, count: number, ignore: string[] = ignoreList) {
  const store: Record<string, number[]> = {};
  return async (ctx: Context, next: Next) => {
    const ip = ctx.ip;
    if (ignore.includes(ip)) {
      logger.log(`IP: ${ip} 白名单访问`)
      await next();
      return
    }
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
