import moment from "moment/moment";
import {AppResponseCode, getErrorMessage} from "./errors";
import {Context} from "koa";
import {aesEncrypt} from "./encode";

export function responseWithCode(code: AppResponseCode, msg?: string) {
  return {
    code,
    data: code === AppResponseCode.OK ? msg : null,
    error: code !== AppResponseCode.OK ? msg || getErrorMessage(code) : ''
  }
}

export function responseWrap(data: any, code = AppResponseCode.OK) {
  return {
    code,
    data: code === AppResponseCode.OK ? data : null,
    error: code !== AppResponseCode.OK ? data : ''
  }
}

export function sendAESResponse(data: Record<any, any>, ctx: Context) {
  // @ts-ignore
  const key = ctx.request.AESKey;
  ctx.set('Content-Type', 'text/plain')
  ctx.body = aesEncrypt(JSON.stringify(data), key)
}

export function over7Days(time: any, now = Date.now()) {
  return moment(time).add(7, 'day').isBefore(now, 'day')
}

export function toParams<T>(keys: (keyof T)[], data: any): T {
  return keys.reduce((res, k) => {
    if (k in data) {
      res[k] = data[k]
    }
    return res;
  }, {} as any);
}

export function isNotEmpty<T extends Record<string, any>, R extends keyof T>(obj: T, option?: { omits?: R[], includes?: R[] }) {
  const includes = option?.includes
  let keys: R[] = includes ? includes : Object.keys(obj) as R[];
  if (option?.omits?.length) {
    keys = keys.filter(k => !option.omits!.includes(k as R))
  }
  return keys.every(k => (obj[k] !== null && obj[k] !== undefined && obj[k] !== ''))
}
