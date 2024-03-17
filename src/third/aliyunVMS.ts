// This file is auto-generated, don't edit it
// 依赖的模块可通过下载工程中的模块依赖文件或右上角的获取 SDK 依赖信息查看
import Dyvmsapi20170525, * as $Dyvmsapi20170525 from '@alicloud/dyvmsapi20170525';
import OpenApi, * as $OpenApi from '@alicloud/openapi-client';
import Util, * as $Util from '@alicloud/tea-util';
import * as $tea from '@alicloud/tea-typescript';


export default class Client {

  /**
   * 使用AK&SK初始化账号Client
   * @param accessKeyId
   * @param accessKeySecret
   * @return Client
   * @throws Exception
   */
  static createClient(): Dyvmsapi20170525 {
    // 工程代码泄露可能会导致 AccessKey 泄露，并威胁账号下所有资源的安全性。以下代码示例仅供参考，建议使用更安全的 STS 方式，更多鉴权访问方式请参见：https://help.aliyun.com/document_detail/378664.html。
    let config = new $OpenApi.Config({
      // 必填，请确保代码运行环境设置了环境变量 ALIBABA_CLOUD_ACCESS_KEY_ID。
      accessKeyId: process.env['ALIBABA_CLOUD_ACCESS_KEY_ID'],
      // 必填，请确保代码运行环境设置了环境变量 ALIBABA_CLOUD_ACCESS_KEY_SECRET。
      accessKeySecret: process.env['ALIBABA_CLOUD_ACCESS_KEY_SECRET'],
    });
    // Endpoint 请参考 https://api.aliyun.com/product/Dyvmsapi
    config.endpoint = `dyvmsapi.aliyuncs.com`;
    return new Dyvmsapi20170525(config);
  }

  static async main(args: string[]): Promise<void> {
    let client = Client.createClient();
    let singleCallByTtsRequest = new $Dyvmsapi20170525.SingleCallByTtsRequest({ });
    let runtime = new $Util.RuntimeOptions({ });
    try {
      // 复制代码运行请自行打印 API 的返回值
      await client.singleCallByTtsWithOptions(singleCallByTtsRequest, runtime);
    } catch (error: any) {
      // 此处仅做打印展示，请谨慎对待异常处理，在工程项目中切勿直接忽略异常。
      // 错误 message
      console.log(error.message);
      // 诊断地址
      console.log(error.data["Recommend"]);
      Util.assertAsString(error.message);
    }
  }

}

Client.main(process.argv.slice(2));
