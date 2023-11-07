import { http } from "@/utils/http";
import { Result, PageResult } from "@/api/common";
//import { SysCfg } from "@/api/sys/sys-cfg.d";

//Api

/** 获取配置管理列表 */
export const getSysCfgPage = (data?: object) => {
  return http.request<Result<PageResult<SysCfg>>>(
    "post",
    "/api/v1/sys/sys-cfg/page",
    {
      data
    }
  );
};

/** 获取配置 */
export const getSysCfg = (data?: object) => {
  return http.request<Result<SysCfg>>("post", "/api/v1/sys/sys-cfg/get", {
    data
  });
};

/** 创建配置 */
export const createSysCfg = (data?: object) => {
  return http.request<Result<SysCfg>>("post", "/api/v1/sys/sys-cfg/create", {
    data
  });
};

/** 更新配置 */
export const updateSysCfg = (data?: object) => {
  return http.request<Result<SysCfg>>("post", "/api/v1/sys/sys-cfg/update", {
    data
  });
};

/** 删除配置 */
export const delSysCfg = (data?: object) => {
  return http.request<Result<SysCfg>>("post", "/api/v1/sys/sys-cfg/del", {
    data
  });
};

//Model

/** 配置 */
interface SysCfg {
  /** 主键编码 */
  id: number;
  /** 名字 */
  name: string;
  /** key */
  key: string;
  /** Value */
  value: string;
  /** Type */
  type: string;
  /** Remark */
  remark: string;
  /** Status */
  status: number;
  /** 更新者 */
  updateBy: number;
  /** 最后更新时间 */
  updatedAt: Date;
}

interface SysCfgFormItemProps {
  /** 主键编码 */
  id: number;
  /** 名字 */
  name: string;
  /** key */
  key: string;
  /** Value */
  value: string;
  /** Type */
  type: string;
  /** Remark */
  remark: string;
  /** Status */
  status: number;
}
interface SysCfgFormProps {
  formInline: SysCfgFormItemProps;
}

export type { SysCfgFormItemProps, SysCfgFormProps, SysCfg };
