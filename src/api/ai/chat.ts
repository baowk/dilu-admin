import { http } from "@/utils/http";
import { Result } from "@/api/common";
//import { Task } from "@/api/notice/task.d";

//Api

/** 获取Task管理列表 */
export const chat = (data?: object) => {
  return http.request<Result<string>>("post", "/api/v1/ai/chat", {
    data
  });
};

//Model

/** Task */
interface ChatReq {
  platform: string;
  modelName: string;
  messages: Message;
}

interface Message {
  /** 任务内容 */
  content: string;
  /** 角色 */
  role: string;
}

export type { ChatReq, Message };
