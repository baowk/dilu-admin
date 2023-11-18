import { http } from "@/utils/http";
import { Result, PageResult } from "@/api/common";
//import { SysTeam } from "@/api/sys/sys-team.d";

//Api

/** 获取团队管理列表 */
export const getSysTeamPage = (data?: object) => {
  return http.request<Result<PageResult<SysTeam>>>(
    "post",
    "/api/v1/sys/sys-team/page",
    {
      data
    }
  );
};

/** 获取团队 */
export const getSysTeam = (data?: object) => {
  return http.request<Result<SysTeam>>("post", "/api/v1/sys/sys-team/get", {
    data
  });
};

/** 创建团队 */
export const createSysTeam = (data?: object) => {
  return http.request<Result<SysTeam>>("post", "/api/v1/sys/sys-team/create", {
    data
  });
};

/** 更新团队 */
export const updateSysTeam = (data?: object) => {
  return http.request<Result<SysTeam>>("post", "/api/v1/sys/sys-team/update", {
    data
  });
};

/** 删除团队 */
export const delSysTeam = (data?: object) => {
  return http.request<Result<SysTeam>>("post", "/api/v1/sys/sys-team/del", {
    data
  });
};

/** 更新团队 */
export const changeTeam = (data?: object) => {
  return http.request<Result<SysTeam>>("post", "/api/v1/sys/sys-team/change", {
    data
  });
};

//Model

/** 团队 */
interface SysTeam {
  /** 主键 */
  id: number;
  /** 团队名 */
  name: string;
  /** 团队拥有者 */
  owner: number;
  /** 状态 */
  status: number;
  /** 创建时间 */
  createdAt: Date;
  /** 更新时间 */
  updatedAt: Date;
}

interface SysTeamFormItemProps {
  /** 主键 */
  id: number;
  /** 团队名 */
  name: string;
  /** 团队拥有者 */
  owner: number;
  /** 状态 */
  status: number;
}
interface SysTeamFormProps {
  formInline: SysTeamFormItemProps;
}

export type { SysTeamFormItemProps, SysTeamFormProps, SysTeam };
