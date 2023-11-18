import { http } from "@/utils/http";
import { Result, PageResult } from "@/api/common";
//import { SysMember } from "@/api/sys/sys-member.d";

//Api

/** 获取会员管理列表 */
export const getSysMemberPage = (data?: object) => {
  return http.request<Result<PageResult<SysMember>>>(
    "post",
    "/api/v1/sys/sys-member/page",
    {
      data
    }
  );
};

/** 获取会员 */
export const getSysMember = (data?: object) => {
  return http.request<Result<SysMember>>("post", "/api/v1/sys/sys-member/get", {
    data
  });
};

/** 创建会员 */
export const createSysMember = (data?: object) => {
  return http.request<Result<SysMember>>(
    "post",
    "/api/v1/sys/sys-member/create",
    {
      data
    }
  );
};

/** 更新会员 */
export const updateSysMember = (data?: object) => {
  return http.request<Result<SysMember>>(
    "post",
    "/api/v1/sys/sys-member/update",
    {
      data
    }
  );
};

/** 删除会员 */
export const delSysMember = (data?: object) => {
  return http.request<Result<SysMember>>("post", "/api/v1/sys/sys-member/del", {
    data
  });
};

export const changeMyInfo = (data?: object) => {
  return http.request<Result<SysMember>>(
    "post",
    "/api/v1/sys/sys-member/changeMyInfo",
    {
      data
    }
  );
};
//Model

/** 会员 */
interface SysMember {
  /** 主键 */
  id: number;
  /** 团队id */
  teamId: number;
  /** 用户id */
  userId: number;
  /** 昵称 */
  nickname: string;
  /** 姓名 */
  name: string;
  /** 电话 */
  phone: string;
  /** 部门路径 */
  deptPath: string;
  /** 部门id */
  deptId: number;
  /** 职位标签 -1系统超管 1 团队拥有者 2主管 4副主管 8员工 */
  postId: number;
  /**角色id */
  roles: string;
  /**入职时间 */
  entryTime: Date;
  /**离职时间 */
  retireTime: Date;
  /**生日 */
  birthday: Date;
  /** 状态 1正常  */
  status: number;
  gender: string;
  /** 创建者 */
  createBy: number;
  /** 更新者 */
  updateBy: number;
  /** 创建时间 */
  createdAt: Date;
  /** 最后更新时间 */
  updatedAt: Date;
}

interface SysMemberFormItemProps {
  /** 主键 */
  id: number;
  /** 团队id */
  teamId: number;
  /** 用户id */
  userId: number;
  /** 昵称 */
  nickname: string;
  /** 姓名 */
  name: string;
  /** 电话 */
  phone: string;
  /** 部门路径 */
  deptPath: string;
  /** 部门id */
  deptId: number;
  /**角色id */
  roles: string;
  /** 职位标签 -1系统超管 1 团队拥有者 2主管 4副主管 8员工 */
  postId: number;
  /** 状态 1正常  */
  status: number;
  /**入职时间 */
  entryTime: Date;
  /**离职时间 */
  retireTime: Date;
  /**生日 */
  birthday: Date;
  gender: string;
}
interface SysMemberFormProps {
  formInline: SysMemberFormItemProps;
}

export type { SysMemberFormItemProps, SysMemberFormProps, SysMember };
