import { http } from "@/utils/http";
import { Result } from "@/api/common";

export const getAsyncRoutes = () => {
  return http.request<Result<Array<any>>>(
    "post",
    "/api/v1/sys/sys-menu/userMenus"
  );
};
