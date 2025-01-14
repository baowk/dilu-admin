import { http } from "@/utils/http";
import { Result, PageResult } from "@/api/common";
//import { EventDaySt } from "@/api/dental/event-day-st.d";

//Api

/** 获取每日统计管理列表 */
export const getEventDayStPage = (data?: object) => {
  return http.request<Result<PageResult<EventDaySt>>>(
    "post",
    "/api/v1/dental/event-day-st/page",
    {
      data
    }
  );
};

/** 获取每日统计 */
export const getEventDaySt = (data?: object) => {
  return http.request<Result<EventDaySt>>(
    "post",
    "/api/v1/dental/event-day-st/get",
    {
      data
    }
  );
};

/** 创建每日统计 */
export const createEventDaySt = (data?: object) => {
  return http.request<Result<EventDaySt>>(
    "post",
    "/api/v1/dental/event-day-st/create",
    {
      data
    }
  );
};

/** 更新每日统计 */
export const updateEventDaySt = (data?: object) => {
  return http.request<Result<EventDaySt>>(
    "post",
    "/api/v1/dental/event-day-st/update",
    {
      data
    }
  );
};

/** 删除每日统计 */
export const delEventDaySt = (data?: object) => {
  return http.request<Result<EventDaySt>>(
    "post",
    "/api/v1/dental/event-day-st/del",
    {
      data
    }
  );
};

//Model

/** 每日统计 */
interface EventDaySt {
  /** 主键 */
  id: number;
  /** 时间 */
  day: number;
  /** 团队id */
  teamId: number;
  /** 用户id */
  userId: number;
  /** 部门路径 */
  deptPath: string;
  /** 留存 */
  newCustomerCnt: number;
  /** 初诊 */
  firstDiagnosis: number;
  //firstDiagnosisReferred: number;
  /** 复诊 */
  furtherDiagnosis: number;
  recheck: number;
  /** 成交 */
  deal: number;
  /** 明日邀约 */
  invitation: number;
  /** 休息 */
  rest: number;
  /** 创建时间 */
  createdAt: number;
  /** 更新时间 */
  updatedAt: number;
}

interface EventDayStFormItemProps {
  /** 主键 */
  id: number;
  /** 时间 */
  day: number | string | Date;
  /** 团队id */
  teamId: number;
  /** 用户id */
  userId: number;
  /** 部门路径 */
  deptPath: string;
  /** 留存 */
  newCustomerCnt: number;
  /** 初诊 */
  firstDiagnosis: number;
  //firstDiagnosisReferred: number;
  /** 复诊 */
  furtherDiagnosis: number;
  recheck: number;
  /** 成交 */
  deal: number;
  /** 明日邀约 */
  invitation: number;
  /** 休息 */
  rest: number;
}
interface EventDayStFormProps {
  formInline: EventDayStFormItemProps;
}

export type { EventDayStFormItemProps, EventDayStFormProps, EventDaySt };
