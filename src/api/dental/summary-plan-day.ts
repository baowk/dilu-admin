import { http } from "@/utils/http";
import { Result, PageResult } from "@/api/common";
//import { SummaryPlanDay } from "@/api/dental/summary-plan-day.d";

//Api

/** 获取总结与计划管理列表 */
export const getSummaryPlanDayPage = (data?: object) => {
  return http.request<Result<PageResult<SummaryPlanDay>>>(
    "post",
    "/api/v1/dental/summary-plan-day/page",
    {
      data
    }
  );
};

/** 获取总结与计划 */
export const getSummaryPlanDay = (data?: object) => {
  return http.request<Result<SummaryPlanDay>>(
    "post",
    "/api/v1/dental/summary-plan-day/get",
    {
      data
    }
  );
};

/** 创建总结与计划 */
export const createSummaryPlanDay = (data?: object) => {
  return http.request<Result<SummaryPlanDay>>(
    "post",
    "/api/v1/dental/summary-plan-day/create",
    {
      data
    }
  );
};

/** 更新总结与计划 */
export const updateSummaryPlanDay = (data?: object) => {
  return http.request<Result<SummaryPlanDay>>(
    "post",
    "/api/v1/dental/summary-plan-day/update",
    {
      data
    }
  );
};

/** 删除总结与计划 */
export const delSummaryPlanDay = (data?: object) => {
  return http.request<Result<SummaryPlanDay>>(
    "post",
    "/api/v1/dental/summary-plan-day/del",
    {
      data
    }
  );
};

//Model

/** 总结与计划 */
interface SummaryPlanDay {
  /** 主键 */
  id: number;
  /** 天 */
  day: number;
  /** 团队id */
  teamId: number;
  /** 用户id */
  userId: number;
  /** 部门路径 */
  deptPath: string;
  /** 今日总结 */
  summary: string;
  /** 明日计划 */
  plan: string;
  /** 创建时间 */
  createdAt: Date;
  /** 更新时间 */
  updatedAt: Date;
}

interface SummaryPlanDayFormItemProps {
  /** 主键 */
  id: number;
  /** 天 */
  day: number;
  /** 团队id */
  teamId: number;
  /** 用户id */
  userId: number;
  /** 部门路径 */
  deptPath: string;
  /** 今日总结 */
  summary: string;
  /** 明日计划 */
  plan: string;
}
interface SummaryPlanDayFormProps {
  formInline: SummaryPlanDayFormItemProps;
}

export type {
  SummaryPlanDayFormItemProps,
  SummaryPlanDayFormProps,
  SummaryPlanDay
};
