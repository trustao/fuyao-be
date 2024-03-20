import {
  createHash,
  createKeyPairFile,
  rsaPublicEncrypt,
  createRandomKey,
  getPrivateKey,
  aesEncrypt,
  rsaPrivateDecrypt, aesDecrypt
} from "./util/encode";
import path from "path";
import fs from "fs";

function createNewKey() {
  const key = createHash();
  console.log(key);
  createKeyPairFile(key, process.cwd());
}

function demo() {
  console.time('Duration')
  const data = {
    phone: '18800008888',
    code: createRandomKey()
  }

  const passphrase = 'fd10fee466d5c73743f6de0c210086ab0417a8995a08af130f07dc687d94513e';

  const privateKey: string = getPrivateKey(path.join(process.cwd(), 'private.pem'))
  const publicKey: string = fs.readFileSync(path.join(process.cwd(), 'public.pem'), 'utf8')
  console.log(data);

  const aseKey = createHash();
  console.log('ASE秘钥', aseKey);
  const encryptedKey = rsaPublicEncrypt(aseKey, publicKey) as string;

  console.log('RSA加密秘钥');
  console.log(encryptedKey)
  const aesEncrypted = aesEncrypt(JSON.stringify(data), aseKey)

  console.log("ASE加密数据", aesEncrypted);

  const decryptAesKey = rsaPrivateDecrypt(privateKey, passphrase, encryptedKey) as string;
  console.log('RSA解密秘钥', decryptAesKey);


  const decryptData = aesDecrypt(aesEncrypted, decryptAesKey);
  console.log('AES解密数据', decryptData)
  console.timeEnd('Duration')

}


createNewKey();
