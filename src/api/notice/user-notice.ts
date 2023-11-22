import { http } from "@/utils/http";
import { Result, PageResult } from "@/api/common";
//import { UserNotice } from "@/api/notice/user-notice.d";

//Api 

/** 获取用户通知管理列表 */
export const getUserNoticePage = (data?: object) => {
  return http.request<Result<PageResult<UserNotice>>>(
    "post",
    "/api/v1/notice/user-notice/page",
    {
      data
    }
  );
};

/** 获取用户通知 */
export const getUserNotice = (data?: object) => {
  return http.request<Result<UserNotice>>("post", "/api/v1/notice/user-notice/get", {
    data
  });
};

/** 创建用户通知 */
export const createUserNotice = (data?: object) => {
  return http.request<Result<UserNotice>>("post", "/api/v1/notice/user-notice/create", {
    data
  });
};

/** 更新用户通知 */
export const updateUserNotice = (data?: object) => {
  return http.request<Result<UserNotice>>("post", "/api/v1/notice/user-notice/update",{
    data
  });
};

/** 删除用户通知 */
export const delUserNotice = (data?: object) => {
  return http.request<Result<UserNotice>>("post", "/api/v1/notice/user-notice/del",{
    data
  });
};

//Model

/** 用户通知 */
interface UserNotice {
  
  /** 主键 */
  id: number;
  /** 团队id */
  teamId: number;
  /** 用户id */
  userId: number;
  /** 标题 */
  title: string;
  /** 内容 */
  content: string;
  /** 消息类型 */
  noticeType: number;
  /** 操作类型 */
  op: number;
  /** 操作对象id */
  opId: number;
  /** 状态 1未读 2已读 -1回收站 */
  status: number;
  /** 创建人 */
  createBy: number;
  /** 创建时间 */
  createdAt: Date;
  /** 更新时间 */
  updatedAt: Date;
  /** 删除时间 */
  deleteAt: Date;
}


interface UserNoticeFormItemProps {
  
  /** 主键 */
  id: number;
  /** 团队id */
  teamId: number;
  /** 用户id */
  userId: number;
  /** 标题 */
  title: string;
  /** 内容 */
  content: string;
  /** 消息类型 */
  noticeType: number;
  /** 操作类型 */
  op: number;
  /** 操作对象id */
  opId: number;
  /** 状态 1未读 2已读 -1回收站 */
  status: number;
  /** 删除时间 */
  deleteAt: Date;
}
interface UserNoticeFormProps {
  formInline: UserNoticeFormItemProps;
}

export type { UserNoticeFormItemProps, UserNoticeFormProps, UserNotice };