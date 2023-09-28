//Model

/** 成员 */
interface SysMember {
  /** 主键 */
  id: number;
  /** 部门id */
  deptId: number;
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
  /** 职位标签 1主管 2副主管 3员工 */
  postTag: number;
  /** 状态 1正常  */
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

interface SysMemberFormItemProps {
  /** 主键 */
  id: number;

  /** 部门id */
  deptId: number;

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

  /** 职位标签 1主管 2副主管 3员工 */
  postTag: number;

  /** 状态 1正常  */
  status: number;
}
interface SysMemberFormProps {
  formInline: SysMemberFormItemProps;
}

export type { SysMemberFormItemProps, SysMemberFormProps, SysMember };
