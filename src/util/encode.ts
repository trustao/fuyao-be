import crypto from 'crypto'
import fs from 'fs';
import path from 'path';

const privateKeyText = fs.readFileSync(process.env.PRIVATE_KEY_PATH as string, 'utf8');


export function md5 (text: string) {
  return crypto.createHash('md5').update(text).digest('hex');
}

export function base64(text: string) {
  return Buffer.from(text, 'utf-8').toString("base64")
}

export function createRandomKey() {
  return Math.random().toString(32).slice(2, 8);
}

export function createHash(text?: string): string {
  return crypto.createHash('sha256').update(text || createRandomKey(), 'utf8').digest('hex')
}

// 生成 rsa 非对称密钥对
// 返回 {publicKey, privateKey}
function getKeyPair(passphrase: string) {
  return crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048, // 模数的位数，即密钥的位数，2048 或以上一般是安全的
    publicExponent: 0x10001, // 指数值，必须为奇数，默认值为 0x10001，即 65537
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem'
    },
    privateKeyEncoding: {
      type: 'pkcs8', // 用于存储私钥信息的标准语法标准
      format: 'pem', // base64 编码的 DER 证书格式
      cipher: 'aes-256-cbc', // 加密算法和操作模式
      passphrase
    }
  });
}

// 生成 rsa 非对称密钥对文件到指定路径，名称分别为 private.pem 和 public.pem
export function createKeyPairFile(passphrase: string, filePath = __dirname) {
  const {publicKey, privateKey} = getKeyPair(passphrase);
  try {
    fs.writeFileSync(path.join(filePath, 'private.pem'), privateKey, 'utf8');
    fs.writeFileSync(path.join(filePath, 'public.pem'), publicKey, 'utf8');
  } catch (err) {
    console.error(err);
  }
}

// 使用公钥加密数据
function publicEncrypt(msg: string, publicKey: string, encoding: BufferEncoding = 'base64') {
  const encryptBuffer = crypto.publicEncrypt({
    key: publicKey,
    padding: crypto.constants.RSA_PKCS1_PADDING // 填充方式，需与解密一致
  }, Buffer.from(msg, 'utf8'));
  if (encoding) {
    return encryptBuffer.toString(encoding);
  } else {
    return encryptBuffer;
  }
}

// 使用私钥解密数据
function privateDecrypt(privateKey: string, passphrase: string, data: string) {
  const encryptBuffer = Buffer.from(data, 'base64');
  const msgBuffer = crypto.privateDecrypt({
    key: privateKey,
    passphrase,
    padding: crypto.constants.RSA_PKCS1_PADDING
  }, encryptBuffer);

  return JSON.parse(msgBuffer.toString('utf8'));
}

// 使用私钥签名数据
function privateSign(privateKey: string, passphrase: string, data: string, encoding: BufferEncoding = 'base64') {
  const encryptBuffer = Buffer.from(data, 'base64')
  const sign = crypto.createSign('SHA256');
  sign.update(encryptBuffer);
  sign.end();
  const signatureBuffer = sign.sign({
    key: privateKey,
    passphrase
  });
  if (encoding) {
    return signatureBuffer.toString(encoding);
  } else {
    return signatureBuffer;
  }
}

// 使用公钥验证签名
function publicVerify(publicKey: string, data: string, signatureBuffer: Buffer) {
  const encryptBuffer = Buffer.from(data, 'base64');
  const verify = crypto.createVerify('SHA256');
  verify.update(encryptBuffer);
  verify.end();
  return verify.verify(publicKey, signatureBuffer);
}
