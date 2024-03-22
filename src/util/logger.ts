import moment from "moment";


function prefix() {
  return `[FY]-[${moment().format('YYYY-MM-DD HH:mm:ss')}]`;
}

export default {
  log: (...args: any[]) => console.log(prefix(), ...args),
  error: (...args: any[]) => console.error(prefix(), ...args),
  warn: (...args: any[]) => console.warn(prefix(), ...args),
  info: (...args: any[]) => console.info(prefix(), ...args),
}
