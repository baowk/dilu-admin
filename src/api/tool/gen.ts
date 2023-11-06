import { http } from "@/utils/http";
import { Result, PageResult } from "@/api/common";

/** 获取GenTables管理列表 */
export const listDbTable = (data?: object) => {
  return http.request<Result<PageResult<DbTable>>>(
    "post",
    "/api/tools/db/tables/page",
    {
      data
    }
  );
};

/** 获取GenTables */
export const importTable = (data?: object) => {
  return http.request<Result<DbTable>>("post", "/api/tools/tables/info", {
    data
  });
};

/** GenCode */
export const GenCode = (data?: object) => {
  return http.request<Result<string>>("post", "/api/tools/gen/code", {
    data
  });
};

/** GenTables */
interface DbTable {
  tableName: string;
  tableSchema: string;
  engine: string;
  tableRows: string;
  tableCollation: string;
  createTime: string;
  updateTime: string;
  tableComment: string;
}

export type { DbTable };
