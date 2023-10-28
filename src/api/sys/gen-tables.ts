import { http } from "@/utils/http";
import { Result, PageResult } from "@/api/common";
//import { GenTables } from "@/api/sys/gen-tables.d";

//Api 

/** 获取GenTables管理列表 */
export const getGenTablesPage = (data?: object) => {
  return http.request<Result<PageResult<GenTables>>>(
    "post",
    "/api/v1/sys/gen-tables/page",
    {
      data
    }
  );
};

/** 获取GenTables */
export const getGenTables = (data?: object) => {
  return http.request<Result<GenTables>>("post", "/api/v1/sys/gen-tables/get", {
    data
  });
};

/** 创建GenTables */
export const createGenTables = (data?: object) => {
  return http.request<Result<GenTables>>("post", "/api/v1/sys/gen-tables/create", {
    data
  });
};

/** 更新GenTables */
export const updateGenTables = (data?: object) => {
  return http.request<Result<GenTables>>("post", "/api/v1/sys/gen-tables/update",{
    data
  });
};

/** 删除GenTables */
export const delGenTables = (data?: object) => {
  return http.request<Result<GenTables>>("post", "/api/v1/sys/gen-tables/del",{
    data
  });
};

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

export type { GenTablesFormItemProps, GenTablesFormProps, GenTables };