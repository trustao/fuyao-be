

export enum AppResponseCode {
  OK,
  ServerError,
  Forbidden,
  Unauthorized
}

export const ErrorMessage: Record<AppResponseCode, string> = {
  [AppResponseCode.OK]: '',
  [AppResponseCode.ServerError]: '服务错误',
  [AppResponseCode.Forbidden]: '访问受限',
  [AppResponseCode.Unauthorized]: '认证失效',
}


export function getErrorMessage(code: AppResponseCode) {
  return ErrorMessage[code] || '未知错误'
}
