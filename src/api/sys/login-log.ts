import { http } from "@/utils/http";
import { Result, PageResult } from "@/api/common";
//import { LoginLog } from "@/api/sys/login-log.d";

//Api 

/** 获取LoginLog管理列表 */
export const getLoginLogPage = (data?: object) => {
  return http.request<Result<PageResult<LoginLog>>>(
    "post",
    "/api/v1/sys/logslogin/page",
    {
      data
    }
  );
};

/** 获取LoginLog */
export const getLoginLog = (data?: object) => {
  return http.request<Result<LoginLog>>("post", "/api/v1/sys/logslogin/get", {
    data
  });
};

/** 创建LoginLog */
export const createLoginLog = (data?: object) => {
  return http.request<Result<LoginLog>>("post", "/api/v1/sys/logslogin/create", {
    data
  });
};

/** 更新LoginLog */
export const updateLoginLog = (data?: object) => {
  return http.request<Result<LoginLog>>("post", "/api/v1/sys/logslogin/update",{
    data
  });
};

/** 删除LoginLog */
export const delLoginLog = (data?: object) => {
  return http.request<Result<LoginLog>>("post", "/api/v1/sys/login-log/del",{
    data
  });
};

//Model

/** LoginLog */
interface LoginLog {
  
  /** id */
  id: number;
  /** 用户id */
  uid: number;
  /** 登录方式 */
  method: number;
  /** 登录ip */
  ip: string;
  /** 地域 */
  region: string;
  /** 客户端 */
  clientId: string;
  /** 操作系统 */
  clientVer: string;
  /** 操作系统 */
  os: string;
  /** 操作系统版本 */
  osVer: string;
  /** 更新时间 */
  updatedAt: Date;
}


interface LoginLogFormItemProps {
  
  /** id */
  id: number;
  /** 用户id */
  uid: number;
  /** 登录方式 */
  method: number;
  /** 登录ip */
  ip: string;
  /** 地域 */
  region: string;
  /** 客户端 */
  clientId: string;
  /** 操作系统 */
  clientVer: string;
  /** 操作系统 */
  os: string;
  /** 操作系统版本 */
  osVer: string;
}
interface LoginLogFormProps {
  formInline: LoginLogFormItemProps;
}

export type { LoginLogFormItemProps, LoginLogFormProps, LoginLog };