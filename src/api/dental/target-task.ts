import { http } from "@/utils/http";
import { Result, PageResult } from "@/api/common";
//import { TargetTask } from "@/api/dental/target-task.d";

//Api 

/** 获取TargetTask管理列表 */
export const getTargetTaskPage = (data?: object) => {
  return http.request<Result<PageResult<TargetTask>>>(
    "post",
    "/api/v1/dental/target-task/page",
    {
      data
    }
  );
};

/** 获取TargetTask */
export const getTargetTask = (data?: object) => {
  return http.request<Result<TargetTask>>("post", "/api/v1/dental/target-task/get", {
    data
  });
};

/** 创建TargetTask */
export const createTargetTask = (data?: object) => {
  return http.request<Result<TargetTask>>("post", "/api/v1/dental/target-task/create", {
    data
  });
};

/** 更新TargetTask */
export const updateTargetTask = (data?: object) => {
  return http.request<Result<TargetTask>>("post", "/api/v1/dental/target-task/update",{
    data
  });
};

/** 删除TargetTask */
export const delTargetTask = (data?: object) => {
  return http.request<Result<TargetTask>>("post", "/api/v1/dental/target-task/del",{
    data
  });
};

//Model

/** TargetTask */
interface TargetTask {
  
  /** 主键 */
  id: number;
  /** 时间类型:月 30,周 7 */
  dayType: number;
  /** 时间:202310 */
  day: number;
  /** 团队id */
  teamId: number;
  /** 用户id */
  userId: number;
  /** 部门路径 */
  deptPath: string;
  /** 留存任务 */
  newCustomerCnt: number;
  /** 导诊任务 */
  firstDiagnosis: number;
  /** 成交任务 */
  deal: number;
  /** 创建者 */
  createBy: number;
  /** 更新者 */
  updateBy: number;
  /** 创建时间 */
  createdAt: Date;
  /** 更新时间 */
  updatedAt: Date;
}


interface TargetTaskFormItemProps {
  
  /** 主键 */
  id: number;
  /** 时间类型:月 30,周 7 */
  dayType: number;
  /** 时间:202310 */
  day: number;
  /** 团队id */
  teamId: number;
  /** 用户id */
  userId: number;
  /** 部门路径 */
  deptPath: string;
  /** 留存任务 */
  newCustomerCnt: number;
  /** 导诊任务 */
  firstDiagnosis: number;
  /** 成交任务 */
  deal: number;
}
interface TargetTaskFormProps {
  formInline: TargetTaskFormItemProps;
}

export type { TargetTaskFormItemProps, TargetTaskFormProps, TargetTask };