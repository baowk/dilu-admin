import { http } from "@/utils/http";
import { Result, PageResult } from "@/api/common";
//import { SysUser } from "@/api/sys/sys-user.d";

//Api

/** 获取用户管理列表 */
export const getSysUserPage = (data?: object) => {
  return http.request<Result<PageResult<SysUser>>>(
    "post",
    "/api/v1/sys/sys-user/page",
    {
      data
    }
  );
};

/** 获取用户 */
export const getSysUser = (data?: object) => {
  return http.request<Result<SysUser>>("post", "/api/v1/sys/sys-user/get", {
    data
  });
};

/** 创建用户 */
export const createSysUser = (data?: object) => {
  return http.request<Result<SysUser>>("post", "/api/v1/sys/sys-user/create", {
    data
  });
};

/** 更新用户 */
export const updateSysUser = (data?: object) => {
  return http.request<Result<SysUser>>("post", "/api/v1/sys/sys-user/update", {
    data
  });
};

/** 删除用户 */
export const delSysUser = (data?: object) => {
  return http.request<Result<SysUser>>("post", "/api/v1/sys/sys-user/del", {
    data
  });
};

//Model

/** 用户 */
interface SysUser {
  /** 主键 */
  id: number;
  /** 用户名 */
  username: string;
  /** 手机号 */
  phone: string;
  /** 邮箱 */
  email: string;
  /** 密码 */
  password: string;
  /** 昵称 */
  nickname: string;
  /** 姓名 */
  name: string;
  /** 头像 */
  avatar: string;
  /** 签名 */
  bio: string;
  /** 生日 格式 yyyy-MM-dd */
  birthday: string;
  /** 性别 1男 2女 3未知 */
  gender: string;
  /** 角色ID */
  roleId: number;
  /** 岗位 */
  post: string;
  /** 备注 */
  remark: string;
  /** 状态 1冻结 2正常 3默认 */
  status: number;
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

interface SysUserFormItemProps {
  /** 主键 */
  id: number;
  /** 用户名 */
  username: string;
  /** 手机号 */
  phone: string;
  /** 邮箱 */
  email: string;
  /** 密码 */
  password: string;
  /** 昵称 */
  nickname: string;
  /** 姓名 */
  name: string;
  /** 头像 */
  avatar: string;
  /** 签名 */
  bio: string;
  /** 生日 格式 yyyy-MM-dd */
  birthday: string;
  /** 性别 1男 2女 3未知 */
  gender: string;
  /** 角色ID */
  roleId: number;
  /** 岗位 */
  post: string;
  /** 备注 */
  remark: string;
  /** 状态 1冻结 2正常 3默认 */
  status: number;
}
interface SysUserFormProps {
  formInline: SysUserFormItemProps;
}

export type { SysUserFormItemProps, SysUserFormProps, SysUser };
