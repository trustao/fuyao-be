import crypto from 'crypto'

export function md5 (text: string) {
  return crypto.createHash('md5').update(text).digest('hex');
}

export function base64(text: string) {
  return Buffer.from(text, 'utf-8').toString("base64")
}
