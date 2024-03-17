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
