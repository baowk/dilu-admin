import { http } from "@/utils/http";
import { Result, PageResult } from "@/api/common";
//import { SysDept } from "@/api/sys/sys-dept.d";

//Api

/** 获取部门管理列表 */
export const getSysDeptPage = (data?: object) => {
  return http.request<Result<PageResult<SysDept>>>(
    "post",
    "/api/v1/sys/sys-dept/page",
    {
      data
    }
  );
};

/** 获取部门管理列表 */
export const getDeptList = (data?: object) => {
  return http.request<Result<SysDept>>("post", "/api/v1/sys/sys-dept/list", {
    data
  });
};

/** 获取部门 */
export const getSysDept = (data?: object) => {
  return http.request<Result<SysDept>>("post", "/api/v1/sys/sys-dept/get", {
    data
  });
};

/** 创建部门 */
export const createSysDept = (data?: object) => {
  return http.request<Result<SysDept>>("post", "/api/v1/sys/sys-dept/create", {
    data
  });
};

/** 更新部门 */
export const updateSysDept = (data?: object) => {
  return http.request<Result<SysDept>>("post", "/api/v1/sys/sys-dept/update", {
    data
  });
};

/** 删除部门 */
export const delSysDept = (data?: object) => {
  return http.request<Result<SysDept>>("post", "/api/v1/sys/sys-dept/del", {
    data
  });
};

//Model

/** 部门 */
interface SysDept {
  /** 主键 */
  id: number;
  /** 父id */
  parentId: number;
  /** 部门路径 */
  deptPath: string;
  /** 部门名 */
  name: string;
  /** 类型 */
  type: number;
  /** 部门领导 */
  principal: string;
  /** 手机号 */
  phone: string;
  /** 邮箱 */
  email: string;
  /** 排序 */
  sort: number;
  /** 状态 */
  status: number;
  /** 备注 */
  remark: string;
  /** 团队id */
  teamId: number;
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

interface SysDeptFormItemProps {
  /** 主键 */
  id: number;
  /** 父id */
  parentId: number;
  /** 部门路径 */
  deptPath: string;
  /** 部门名 */
  name: string;
  /** 类型 */
  type: number;
  /** 部门领导 */
  principal: string;
  /** 手机号 */
  phone: string;
  /** 邮箱 */
  email: string;
  /** 排序 */
  sort: number;
  /** 状态 */
  status: number;
  /** 备注 */
  remark: string;
  /** 团队id */
  teamId: number;
}
interface SysDeptFormProps {
  formInline: SysDeptFormItemProps;
}

export type { SysDeptFormItemProps, SysDeptFormProps, SysDept };
