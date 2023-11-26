import { http } from "@/utils/http";
import { Result, PageResult } from "@/api/common";
//import { Task } from "@/api/notice/task.d";

//Api

/** 获取Task管理列表 */
export const getTaskPage = (data?: object) => {
  return http.request<Result<PageResult<Task>>>(
    "post",
    "/api/v1/notice/task/page",
    {
      data
    }
  );
};

/** 获取Task */
export const getTask = (data?: object) => {
  return http.request<Result<Task>>("post", "/api/v1/notice/task/get", {
    data
  });
};

/** 创建Task */
export const createTask = (data?: object) => {
  return http.request<Result<Task>>("post", "/api/v1/notice/task/create", {
    data
  });
};

/** 更新Task */
export const updateTask = (data?: object) => {
  return http.request<Result<Task>>("post", "/api/v1/notice/task/update", {
    data
  });
};

/** 删除Task */
export const delTask = (data?: object) => {
  return http.request<Result<Task>>("post", "/api/v1/notice/task/del", {
    data
  });
};

//Model

/** Task */
interface Task {
  /** 主键 */
  id: number;
  /** 团队id */
  teamId: number;
  /** 用户id */
  userId: number;
  /** 任务标题 */
  title: string;
  /** 任务内容 */
  content: string;
  /** 任务类型 */
  taskType: number;
  /** 操作类型 */
  op: number;
  /** 操作id */
  opId: number;
  /** 开始时间 */
  beginAt: Date;
  /** 结束时间 */
  endAt: Date;
  /** 提醒时间 */
  reminderTime: Date;
  /** 状态1开启2关闭 */
  status: number;
  /** 提醒状态 1开启 2关闭 */
  reminderStatus: number;
  /** 创建时间 */
  createdAt: Date;
  /** 更新时间 */
  updatedAt: Date;
  /** 删除时间 */
  deletedAt: Date;
}

interface TaskFormItemProps {
  /** 主键 */
  id: number;
  /** 团队id */
  teamId: number;
  /** 用户id */
  userId: number;
  /** 任务标题 */
  title: string;
  /** 任务内容 */
  content: string;
  /** 任务类型 */
  taskType: number;
  /** 操作类型 */
  op: number;
  /** 操作id */
  opId: number;
  /** 开始时间 */
  beginAt: Date;
  /** 结束时间 */
  endAt: Date;
  /** 提醒时间 */
  reminderTime: Date;
  /** 状态1开启2关闭 */
  status: number;
  /** 提醒状态 1开启 2关闭 */
  reminderStatus: number;
}
interface TaskFormProps {
  formInline: TaskFormItemProps;
}

export type { TaskFormItemProps, TaskFormProps, Task };
