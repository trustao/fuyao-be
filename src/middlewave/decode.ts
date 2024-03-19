import {Context, Next} from "koa";
import {aesDecrypt, getPrivateKey, rsaPrivateDecrypt} from "../util/encode";
import logger from "../util/logger";
import {responseWithCode} from "../util";
import {AppResponseCode} from "../util/errors";


const privateKey = getPrivateKey();
const passphrase = process.env.PASSPHRASE as string;

if (!privateKey) {
  logger.error('未读取到privateKey')
  process.exit(1);
}

if (!passphrase) {
  logger.error('未读取到passphrase')
  process.exit(1);
}

console.log('privateKey', privateKey)
console.log('passphrase', passphrase)

export async function bodyDecode(ctx: Context, next: Next) {
  try {
    // @ts-ignore
    const data = ctx.request.body;
    if (ctx.method.toUpperCase() === 'POST' && ctx.url.startsWith('/api')) {
      console.log('bodyDecode', data);
      const encryptedKey = data.i
      const aesKey = rsaPrivateDecrypt(privateKey, passphrase, encryptedKey)
      const decryptedData = aesDecrypt(data.e, aesKey);
      console.log(decryptedData);
      // @ts-ignore
      ctx.request.body = JSON.parse(decryptedData);
    }
  } catch (e: any) {
    logger.error(e)
    ctx.body = responseWithCode(AppResponseCode.DecryptError)
    return;
  }
  await next();
}
