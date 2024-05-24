import { http } from "@/utils/http";
import { Result, PageResult } from "@/api/common";
//import { SysApi } from "@/api/sys/sys-api.d";

//Api

/** 获取接口管理列表 */
export const getSysApiPage = (data?: object) => {
  return http.request<Result<PageResult<SysApi>>>(
    "post",
    "/api/v1/sys/sys-api/page",
    {
      data
    }
  );
};

/** 获取接口 */
export const getSysApi = (data?: object) => {
  return http.request<Result<SysApi>>("post", "/api/v1/sys/sys-api/get", {
    data
  });
};

/** 创建接口 */
export const createSysApi = (data?: object) => {
  return http.request<Result<SysApi>>("post", "/api/v1/sys/sys-api/create", {
    data
  });
};

/** 更新接口 */
export const updateSysApi = (data?: object) => {
  return http.request<Result<SysApi>>("post", "/api/v1/sys/sys-api/update", {
    data
  });
};

/** 删除接口 */
export const delSysApi = (data?: object) => {
  return http.request<Result<SysApi>>("post", "/api/v1/sys/sys-api/del", {
    data
  });
};

//Model

/** 接口 */
interface SysApi {
  /** 主键编码 */
  id: number;
  /** 标题 */
  title: string;
  /** 请求类型 */
  method: string;
  /** 请求地址 */
  path: string;
  /** 权限类型（1：无需认证 2:须token 3：须鉴权） */
  permType: number;
  /** 状态 3 DEF 2 OK 1 del */
  status: number;
  /** 更新者 */
  updateBy: number;
  /** 最后更新时间 */
  updatedAt: Date;
}

interface SysApiFormItemProps {
  /** 主键编码 */
  id: number;
  /** 标题 */
  title: string;
  /** 请求类型 */
  method: string;
  /** 请求地址 */
  path: string;
  /** 权限类型（1：无需认证 2:须token 3：须鉴权） */
  permType: number;
  /** 状态 3 DEF 2 OK 1 del */
  status: number;
}
interface SysApiFormProps {
  formInline: SysApiFormItemProps;
}

export type { SysApiFormItemProps, SysApiFormProps, SysApi };
