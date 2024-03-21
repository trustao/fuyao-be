import {User} from "../models/User";
import {Authentication, CodeType} from "../models/Authentication";
import {createHash, createRandomKey} from "../util/encode";
import moment from "moment";
import AliyunSMSClient from "../third/aliyunSMS";
import {isNotEmpty} from "../util";
import {Op} from "sequelize";
import {Context} from "koa";

const EXPIRE_DAY = 3;
export type LoginParam = LoginWithPhoneParam | LoginWithUsernameParam;

export interface LoginWithPhoneParam {
  phone: string;
  code: string
}

export interface LoginWithUsernameParam {
  username: string;
  password: string;
}


export async function login(params: LoginParam) {
  if (isNotEmpty(params as LoginWithPhoneParam, {includes: ['phone', 'code']})) {
    return await loginWithPhone(params as LoginWithPhoneParam)
  } else if (isNotEmpty(params as LoginWithUsernameParam, {includes: ['username', 'password']})) {
    return await loginWithUsername(params as LoginWithUsernameParam)
  } else {
    throw new Error('登录信息不全')
  }
}


export async function loginWithPhone(param: LoginWithPhoneParam) {
  const user = await User.findOne({
    where: {
      phone: param.phone,
    }
  });
  if (!user) {
    throw new Error('用户不存在')
  }
  const code = await Authentication.findOne({
    where: {
      user_id: user.id,
      code_type: CodeType.Login,
      code: param.code
    },
  })
  if (!code || moment().isAfter(code.expire_time)) {
    throw new Error('验证码过期')
  }

  return await Authentication.create({
    user_id: user.id,
    code_type: CodeType.Auth,
    code: createHash(),
    expire_time: moment().add(EXPIRE_DAY, 'day').toDate()
  })
}

export async function loginWithUsername(param: LoginWithUsernameParam) {
  const user = await User.findOne({
    where: {
      username: param.username,
      password: param.password
    }
  });
  if (!user) {
    throw new Error('用户不存在或密码错误')
  }
  return await Authentication.create({
    user_id: user.id,
    code_type: CodeType.Auth,
    code: createHash(),
    expire_time: moment().add(EXPIRE_DAY, 'day').toDate()
  })
}


export async function sendVerifyCode(phone: string) {
  if (!phone) {
    throw new Error('号码不存在')
  }
  const code = createRandomKey()
  await Authentication.create({
    phone,
    code_type: CodeType.Login,
    code,
    expire_time: moment().add(5, 'minute').toDate()
  })

  const res = await AliyunSMSClient.main(phone, 'SMS_295736382', {code})
  if (res?.Code !== 'OK') {
    throw new Error(`验证码发送失败\n${JSON.stringify(res)}`)
  }
}


export async function checkAuth(session: string, ctx?: Context) {
  if (!session) return false;
  const auth = await getAuth(session)
  if (auth && ctx) {
    ctx.user = await User.findByPk(auth.user_id)
  }
  return !!auth
}


export async function getAuth(session: string): Promise<Authentication | null> {
  return await Authentication.findOne({
    where: {
      code_type: CodeType.Auth,
      code: session,
      expire_time: {
        [Op.gt]: new Date()
      }
    }
  })
}