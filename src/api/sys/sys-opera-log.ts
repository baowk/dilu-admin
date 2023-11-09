import { http } from "@/utils/http";
import { Result, PageResult } from "@/api/common";
//import { SysOperaLog } from "@/api/sys/sys-opera-log.d";

//Api

/** 获取操作日志管理列表 */
export const getSysOperaLogPage = (data?: object) => {
  return http.request<Result<PageResult<SysOperaLog>>>(
    "post",
    "/api/v1/sys/sys-opera-log/page",
    {
      data
    }
  );
};

/** 获取操作日志 */
export const getSysOperaLog = (data?: object) => {
  return http.request<Result<SysOperaLog>>(
    "post",
    "/api/v1/sys/sys-opera-log/get",
    {
      data
    }
  );
};

/** 创建操作日志 */
export const createSysOperaLog = (data?: object) => {
  return http.request<Result<SysOperaLog>>(
    "post",
    "/api/v1/sys/sys-opera-log/create",
    {
      data
    }
  );
};

/** 更新操作日志 */
export const updateSysOperaLog = (data?: object) => {
  return http.request<Result<SysOperaLog>>(
    "post",
    "/api/v1/sys/sys-opera-log/update",
    {
      data
    }
  );
};

/** 删除操作日志 */
export const delSysOperaLog = (data?: object) => {
  return http.request<Result<SysOperaLog>>(
    "post",
    "/api/v1/sys/sys-opera-log/del",
    {
      data
    }
  );
};

//Model

/** 操作日志 */
interface SysOperaLog {
  /** 主键 */
  id: number;
  /** 操作模块 */
  title: string;
  /** 操作类型 */
  businessType: string;
  /** BusinessTypes */
  businessTypes: string;
  /** 函数 */
  method: string;
  /** 请求方式 GET POST PUT DELETE */
  requestMethod: string;
  /** 操作类型 */
  operatorType: string;
  /** 操作者 */
  operName: string;
  /** 部门名称 */
  deptName: string;
  /** 访问地址 */
  operUrl: string;
  /** 客户端ip */
  operIp: string;
  /** 访问位置 */
  operLocation: string;
  /** 请求参数 */
  operParam: string;
  /** 操作状态 1:成功 2:失败 */
  status: number;
  /** 操作时间 */
  operTime: Date;
  /** 返回数据 */
  jsonResult: string;
  /** 备注 */
  remark: string;
  /** 耗时 */
  latencyTime: string;
  /** ua */
  userAgent: string;
  /** 创建时间 */
  createdAt: Date;
  /** 最后更新时间 */
  updatedAt: Date;
  /** 创建者 */
  createBy: number;
  /** 更新者 */
  updateBy: number;
}

interface SysOperaLogFormItemProps {
  /** 主键 */
  id: number;
  /** 操作模块 */
  title: string;
  /** 操作类型 */
  businessType: string;
  /** BusinessTypes */
  businessTypes: string;
  /** 函数 */
  method: string;
  /** 请求方式 GET POST PUT DELETE */
  requestMethod: string;
  /** 操作类型 */
  operatorType: string;
  /** 操作者 */
  operName: string;
  /** 部门名称 */
  deptName: string;
  /** 访问地址 */
  operUrl: string;
  /** 客户端ip */
  operIp: string;
  /** 访问位置 */
  operLocation: string;
  /** 请求参数 */
  operParam: string;
  /** 操作状态 1:成功 2:失败 */
  status: number;
  /** 操作时间 */
  operTime: Date;
  /** 返回数据 */
  jsonResult: string;
  /** 备注 */
  remark: string;
  /** 耗时 */
  latencyTime: string;
  /** ua */
  userAgent: string;
}
interface SysOperaLogFormProps {
  formInline: SysOperaLogFormItemProps;
}

export type { SysOperaLogFormItemProps, SysOperaLogFormProps, SysOperaLog };
