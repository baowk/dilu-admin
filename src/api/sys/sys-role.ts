import { http } from "@/utils/http";
import { Result, PageResult } from "@/api/common";
//import { SysRole } from "@/api/sys/sys-role.d";

//Api

/** 获取角色管理列表 */
export const getSysRolePage = (data?: object) => {
  return http.request<Result<PageResult<SysRole>>>(
    "post",
    "/api/v1/sys/sys-role/page",
    {
      data
    }
  );
};

/** 获取角色 */
export const getSysRole = (data?: object) => {
  return http.request<Result<SysRole>>("post", "/api/v1/sys/sys-role/get", {
    data
  });
};

/** 创建角色 */
export const createSysRole = (data?: object) => {
  return http.request<Result<SysRole>>("post", "/api/v1/sys/sys-role/create", {
    data
  });
};

/** 更新角色 */
export const updateSysRole = (data?: object) => {
  return http.request<Result<SysRole>>("post", "/api/v1/sys/sys-role/update", {
    data
  });
};

/** 删除角色 */
export const delSysRole = (data?: object) => {
  return http.request<Result<SysRole>>("post", "/api/v1/sys/sys-role/del", {
    data
  });
};

/** 用户管理-获取所有角色列表 */
export const getAllRoleList = () => {
  return http.request<Result<Array<SysRole>>>(
    "post",
    "/api/v1/sys/sys-role/list"
  );
};

/** 用户管理-根据userId，获取对应角色id列表（userId：用户id） */
export const getRoleIds = (data?: object) => {
  return http.request<Result<SysRole>>("post", "", { data });
};

/** 获取角色管理列表 */
export const getRoleList = (data?: object) => {
  return http.request<Result<PageResult<SysRole>>>(
    "post",
    "/api/v1/sys/sys-role/page",
    {
      data
    }
  );
};

//Model

/** 角色 */
interface SysRole {
  /** 主键 */
  id: number;
  /** 角色名称 */
  name: string;
  /** 状态 */
  status: number;
  /** 角色代码 */
  roleKey: string;
  /** 排序 */
  roleSort: number;
  /** flag */
  flag: string;
  /** 备注 */
  remark: string;
  /** 管理员 */
  admin: number;
  /** 数据权限 */
  dataScope: string;
  /** 创建者 */
  createBy: number;
  /** 更新者 */
  updateBy: number;
  /** 创建时间 */
  createdAt: Date;
  /** 最后更新时间 */
  updatedAt: Date;
  /** 删除时间 */
  deletedAt: Date;
}

interface SysRoleFormItemProps {
  /** 主键 */
  id: number;
  /** 角色名称 */
  name: string;
  /** 状态 */
  status: number;
  /** 角色代码 */
  roleKey: string;
  /** 排序 */
  roleSort: number;
  /** flag */
  flag: string;
  /** 备注 */
  remark: string;
  /** 管理员 */
  admin: number;
  /** 数据权限 */
  dataScope: string;
}
interface SysRoleFormProps {
  formInline: SysRoleFormItemProps;
}

export type { SysRoleFormItemProps, SysRoleFormProps, SysRole };
