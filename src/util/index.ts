

export function responseWrap(data: any, code = 0) {
  return {
    code,
    data: code === 0 ? data : null,
    error: code !== 0 ? data : ''
  }
}
