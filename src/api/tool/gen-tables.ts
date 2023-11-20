import { http } from "@/utils/http";
import { Result, PageResult, Option } from "@/api/common";
//import { GenTables } from "@/api/sys/gen-tables.d";

//Api

/** 获取GenTables管理列表 */
export const getGenTablesPage = (data?: object) => {
  return http.request<Result<PageResult<GenTables>>>(
    "post",
    "/api/v1/tools/gen/page",
    {
      data
    }
  );
};

// /** 获取GenTables */
// export const getGenTables = (data?: object) => {
//   return http.request<Result<GenTables>>("post", "/api/v1/tools/gen/get", {
//     data
//   });
// };

/** 更新GenTables */
export const updateGenTables = (data?: object) => {
  return http.request<Result<GenTables>>("post", "/api/v1/tools/gen/update", {
    data
  });
};

/** 删除GenTables */
export const delGenTables = (data?: object) => {
  return http.request<Result<GenTables>>("post", "/api/v1/tools/gen/del", {
    data
  });
};

/** 获取数据库 */
export const getDbs = (data?: object) => {
  return http.request<Result<Array<Option<string>>>>(
    "post",
    "/api/v1/tools/gen/dbs",
    {
      data
    }
  );
};

/** 获取GenTables管理列表 */
export const listDbTable = (data?: object) => {
  return http.request<Result<PageResult<DbTable>>>(
    "post",
    "/api/v1/tools/gen/db/tables",
    {
      data
    }
  );
};

/** 获取GenTables */
export const importTable = (data?: object) => {
  return http.request<Result<DbTable>>("post", "/api/v1/tools/gen/add", {
    data
  });
};

/** GenCode */
export const GenCode = (data?: object) => {
  return http.request<Result<string>>("post", "/api/v1/tools/gen/code", {
    data
  });
};

export const GenMenuApi = (data?: object) => {
  return http.request<Result<string>>("post", "/api/v1/tools/gen/menu", {
    data
  });
};

export const getServer = (data?: object) => {
  return http.request<Result<string>>("post", "/api/v1/tools/monitor", {
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

//Model

/** GenTables */
interface GenTables {
  /**  */
  tableId: number;
  /**  */
  dbName: string;
  /**  */
  tableName: string;
  /**  */
  tableComment: string;
  /**  */
  className: string;
  /**  */
  tplCategory: string;
  /**  */
  packageName: string;
  /**  */
  moduleName: string;
  /** 前端文件名 */
  moduleFrontName: string;
  /**  */
  businessName: string;
  /**  */
  functionName: string;
  /**  */
  functionAuthor: string;
  /**  */
  pkColumn: string;
  /**  */
  pkGoField: string;
  /**  */
  pkJsonField: string;
  /**  */
  options: string;
  /**  */
  treeCode: string;
  /**  */
  treeParentCode: string;
  /**  */
  treeName: string;
  /**  */
  tree: number;
  /**  */
  crud: number;
  /**  */
  remark: string;
  /**  */
  isDataScope: number;
  /**  */
  isActions: number;
  /**  */
  isAuth: number;
  /**  */
  isLogicalDelete: string;
  /**  */
  logicalDelete: number;
  /**  */
  logicalDeleteColumn: string;
  /** 创建时间 */
  createdAt: Date;
  /** 最后更新时间 */
  updatedAt: Date;
  /** 删除时间 */
  deletedAt: Date;
  /** 创建者 */
  createBy: number;
  /** 更新者 */
  updateBy: number;
}

interface GenTablesFormItemProps {
  /**  */
  tableId: number;
  /**  */
  dbName: string;
  /**  */
  tableName: string;
  /**  */
  tableComment: string;
  /**  */
  className: string;
  /**  */
  tplCategory: string;
  /**  */
  packageName: string;
  /**  */
  moduleName: string;
  /** 前端文件名 */
  moduleFrontName: string;
  /**  */
  businessName: string;
  /**  */
  functionName: string;
  /**  */
  functionAuthor: string;
  /**  */
  pkColumn: string;
  /**  */
  pkGoField: string;
  /**  */
  pkJsonField: string;
  /**  */
  options: string;
  /**  */
  treeCode: string;
  /**  */
  treeParentCode: string;
  /**  */
  treeName: string;
  /**  */
  tree: number;
  /**  */
  crud: number;
  /**  */
  remark: string;
  /**  */
  isDataScope: number;
  /**  */
  isActions: number;
  /**  */
  isAuth: number;
  /**  */
  isLogicalDelete: string;
  /**  */
  logicalDelete: number;
  /**  */
  logicalDeleteColumn: string;
}
interface GenTablesFormProps {
  formInline: GenTablesFormItemProps;
}

export type { GenTablesFormItemProps, GenTablesFormProps, GenTables, DbTable };
