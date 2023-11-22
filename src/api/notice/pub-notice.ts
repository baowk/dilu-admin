import { http } from "@/utils/http";
import { Result, PageResult } from "@/api/common";
//import { PubNotice } from "@/api/notice/pub-notice.d";

//Api 

/** 获取公用通知管理列表 */
export const getPubNoticePage = (data?: object) => {
  return http.request<Result<PageResult<PubNotice>>>(
    "post",
    "/api/v1/notice/pub-notice/page",
    {
      data
    }
  );
};

/** 获取公用通知 */
export const getPubNotice = (data?: object) => {
  return http.request<Result<PubNotice>>("post", "/api/v1/notice/pub-notice/get", {
    data
  });
};

/** 创建公用通知 */
export const createPubNotice = (data?: object) => {
  return http.request<Result<PubNotice>>("post", "/api/v1/notice/pub-notice/create", {
    data
  });
};

/** 更新公用通知 */
export const updatePubNotice = (data?: object) => {
  return http.request<Result<PubNotice>>("post", "/api/v1/notice/pub-notice/update",{
    data
  });
};

/** 删除公用通知 */
export const delPubNotice = (data?: object) => {
  return http.request<Result<PubNotice>>("post", "/api/v1/notice/pub-notice/del",{
    data
  });
};

//Model

/** 公用通知 */
interface PubNotice {
  
  /** 主键 */
  id: number;
  /** 针对组消息 */
  teamId: number;
  /** 标题 */
  title: string;
  /** 内容 */
  content: string;
  /** 消息类型 */
  noticeType: number;
  /** 操作类型 */
  op: number;
  /** 操作id */
  opId: number;
  /** 状态 */
  status: number;
  /** 创建人 */
  createBy: number;
  /** 更新人 */
  updateBy: number;
  /** 到期时间 */
  expired: Date;
  /** 创建时间 */
  createdAt: Date;
  /** 更新时间 */
  updatedAt: Date;
}


interface PubNoticeFormItemProps {
  
  /** 主键 */
  id: number;
  /** 针对组消息 */
  teamId: number;
  /** 标题 */
  title: string;
  /** 内容 */
  content: string;
  /** 消息类型 */
  noticeType: number;
  /** 操作类型 */
  op: number;
  /** 操作id */
  opId: number;
  /** 状态 */
  status: number;
  /** 到期时间 */
  expired: Date;
}
interface PubNoticeFormProps {
  formInline: PubNoticeFormItemProps;
}

export type { PubNoticeFormItemProps, PubNoticeFormProps, PubNotice };