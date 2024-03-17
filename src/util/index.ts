import moment from "moment/moment";


export function responseWrap(data: any, code = 0) {
  return {
    code,
    data: code === 0 ? data : null,
    error: code !== 0 ? data : ''
  }
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
