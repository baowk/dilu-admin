import { http } from "@/utils/http";

type Result = {
  code: number;
  msg: string;
  reqId: string;
  data: Array<any>;
};

export const getAsyncRoutes = () => {
  return http.request<Result>("post", "/api/v1/sys/sys-menu/all");
};
