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

export async function bodyDecode(ctx: Context, next: Next) {
  try {
    // @ts-ignore
    const data = ctx.request.body;
    if (ctx.url.startsWith('/fy/api')) {
      const encryptedKey = ctx.request.headers['f-y-key'] as string
      if (!encryptedKey) {
        throw new Error('密钥不存在')
      }
      const aesKey = rsaPrivateDecrypt(privateKey, passphrase, encryptedKey)
      // @ts-ignore;
      ctx.request.AESKey = aesKey;
      logger.log('AES Key', aesKey)
      if (data) {
        const decryptedData = aesDecrypt(data, aesKey);
        logger.log('解密数据', decryptedData);
        // @ts-ignore
        ctx.request.body = JSON.parse(decryptedData);
      }
    }
  } catch (e: any) {
    logger.error(e)
    ctx.body = responseWithCode(AppResponseCode.DecryptError, e.message)
    return;
  }
  await next();
}
