import {base64, md5} from "../util/encode";
import axios from "axios";
import logger from "../util/logger";
import {getShipperCode} from "../util/logisticsCode";


const APP_ID = process.env.EXPRESS_APP_ID as string;
const API_KEY = process.env.EXPRESS_API_KEY as string;

const INFO_API = 'https://api.kdniao.com/Ebusiness/EbusinessOrderHandle.aspx';
const DESCRIBE_API = 'https://api.kdniao.com/api/dist'

export interface LogisticsRes {
  State: string  // 普通物流状态 0-暂无轨迹信息1-已揽收2-在途中3-签收4-问题件5-转寄6-清关
  StateEx: string // 物流状态
  LogisticCode: string, // 快递单号
  ShipperCode: string, // 快递公司编码
  Traces: LogisticsTrace[],
  EBusinessID: string
  Reason: string
  Success: boolean
  Station?: string //	String(50)		派件网点的名称
  StationTel?: string //	String(50)		派件网点的电话
  StationAdd?: string //	String(50)		派件网点的地址
  DeliveryMan?: string //	String(50)		派件快递员
  DeliveryManTel?: string //	String(50)		派件快递员手机号
  NextCity?: string //	String(50)		下一站城市
}

export interface LogisticsTrace {
  AcceptTime: string //		轨迹发生时间，示例：2016-10-28 18:09:45",
  AcceptStation: string // 轨迹描述 "已签收,签收人是【毕森】,签收网点是【威海】",
  Location: string // 历史节点所在城市 "威海市",
  Action: string // 	同 StateEx "3"
  Remark: string //	备注
}

export interface PushedLogisticsData {
  PushTime: string
  EBusinessID: string;
  Data: LogisticsRes[]
  count: number
}

export function sendKDNRequest(url: string, requestType: string, params: any) {
  // 把(jsonStr+APIKey)进行MD5加密，然后Base64编码，最后 进行URL(utf-8)编码
  const formStr = new URLSearchParams({
    RequestData: JSON.stringify(params),
    EBusinessID: APP_ID,
    DataType: "2",
    DataSign: toSignStr(params),
    RequestType: requestType
  }).toString();
  logger.log('KDN Req Params', formStr)
  return Promise.resolve({Success: true});
  return axios.post(url, formStr, {
    headers: {
      "Content-Type": 'application/x-www-form-urlencoded;charset=utf-8'
    }
  }).then(v => v.data)
}

function toSignStr(params: any) {
  return encodeURIComponent(base64(md5(JSON.stringify(params) + API_KEY)))
}

export function getLogisticInfo(logisticCode: string, company: string): Promise<LogisticsRes> {
  let requestType = '8001';
  const params: any = {
    "ShipperCode": getShipperCode(company),
    "LogisticCode": logisticCode
  }
  if (!params.ShipperCode) {
    requestType = '8002'
    delete params.ShipperCode;
  }
  return sendKDNRequest(INFO_API, requestType, params)
}

export function describeLogisticInfo(shipperCode: string, logisticsCode: string): Promise<{Success: boolean}> {
  return sendKDNRequest(DESCRIBE_API, '8008', {ShipperCode: shipperCode, LogisticsCode: logisticsCode})
}
