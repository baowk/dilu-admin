import { http } from "@/utils/http";
import { Result, PageResult } from "@/api/common";
//import { Area } from "@/api/buff/area.d";

//Api 

/** 获取Area管理列表 */
export const getAreaPage = (data?: object) => {
  return http.request<Result<PageResult<Area>>>(
    "post",
    "/api/v1/buff/area/page",
    {
      data
    }
  );
};

/** 获取Area */
export const getArea = (data?: object) => {
  return http.request<Result<Area>>("post", "/api/v1/buff/area/get", {
    data
  });
};

/** 创建Area */
export const createArea = (data?: object) => {
  return http.request<Result<Area>>("post", "/api/v1/buff/area/create", {
    data
  });
};

/** 更新Area */
export const updateArea = (data?: object) => {
  return http.request<Result<Area>>("post", "/api/v1/buff/area/update",{
    data
  });
};

/** 删除Area */
export const delArea = (data?: object) => {
  return http.request<Result<Area>>("post", "/api/v1/buff/area/del",{
    data
  });
};

//Model

/** Area */
interface Area {
  
  /** 主键 */
  id: number;
  /** 编码 */
  code: string;
  /** 名称 */
  name: string;
  /** 中文名 */
  cname: string;
  /** 父级 */
  pid: number;
  /** 层级 */
  level: number;
  /** 状态：3 正常 1 待审核 -1 弃用 */
  status: number;
  /** 创建时间 */
  createdAt: Date;
  /** 更新时间 */
  updatedAt: Date;
}


interface AreaFormItemProps {
  
  /** 主键 */
  id: number;
  /** 编码 */
  code: string;
  /** 名称 */
  name: string;
  /** 中文名 */
  cname: string;
  /** 父级 */
  pid: number;
  /** 层级 */
  level: number;
  /** 状态：3 正常 1 待审核 -1 弃用 */
  status: number;
}
interface AreaFormProps {
  formInline: AreaFormItemProps;
}

export type { AreaFormItemProps, AreaFormProps, Area };