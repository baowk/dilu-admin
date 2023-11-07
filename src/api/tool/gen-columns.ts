// import { http } from "@/utils/http";
// import { Result, PageResult } from "@/api/common";
// //import { GenColumns } from "@/api/sys/gen-columns.d";

// //Api

// /** 获取GenColumns管理列表 */
// export const getGenColumnsPage = (data?: object) => {
//   return http.request<Result<PageResult<GenColumns>>>(
//     "post",
//     "/api/v1/sys/gen-columns/page",
//     {
//       data
//     }
//   );
// };

// /** 获取GenColumns */
// export const getGenColumns = (data?: object) => {
//   return http.request<Result<GenColumns>>(
//     "post",
//     "/api/v1/sys/gen-columns/get",
//     {
//       data
//     }
//   );
// };

// /** 创建GenColumns */
// export const createGenColumns = (data?: object) => {
//   return http.request<Result<GenColumns>>(
//     "post",
//     "/api/v1/sys/gen-columns/create",
//     {
//       data
//     }
//   );
// };

// /** 更新GenColumns */
// export const updateGenColumns = (data?: object) => {
//   return http.request<Result<GenColumns>>(
//     "post",
//     "/api/v1/sys/gen-columns/update",
//     {
//       data
//     }
//   );
// };

// /** 删除GenColumns */
// export const delGenColumns = (data?: object) => {
//   return http.request<Result<GenColumns>>(
//     "post",
//     "/api/v1/sys/gen-columns/del",
//     {
//       data
//     }
//   );
// };

// //Model

// /** GenColumns */
// interface GenColumns {
//   /**  */
//   columnId: number;
//   /**  */
//   tableId: number;
//   /**  */
//   columnName: string;
//   /**  */
//   columnComment: string;
//   /**  */
//   columnType: string;
//   /**  */
//   goType: string;
//   /**  */
//   goField: string;
//   /**  */
//   jsonField: string;
//   /**  */
//   isPk: string;
//   /**  */
//   isIncrement: string;
//   /**  */
//   isRequired: string;
//   /**  */
//   isInsert: string;
//   /**  */
//   isEdit: string;
//   /**  */
//   isList: string;
//   /**  */
//   isQuery: string;
//   /**  */
//   queryType: string;
//   /**  */
//   htmlType: string;
//   /**  */
//   dictType: string;
//   /**  */
//   sort: number;
//   /**  */
//   list: string;
//   /**  */
//   pk: number;
//   /**  */
//   required: number;
//   /**  */
//   superColumn: number;
//   /**  */
//   usableColumn: number;
//   /**  */
//   increment: number;
//   /**  */
//   insert: number;
//   /**  */
//   edit: number;
//   /**  */
//   query: number;
//   /**  */
//   remark: string;
//   /**  */
//   fkTableName: string;
//   /**  */
//   fkTableNameClass: string;
//   /**  */
//   fkTableNamePackage: string;
//   /**  */
//   fkLabelId: string;
//   /**  */
//   fkLabelName: string;
//   /**  */
//   createBy: number;
//   /**  */
//   updateBy: number;
//   /** 创建时间 */
//   createdAt: Date;
//   /** 最后更新时间 */
//   updatedAt: Date;
//   /** 删除时间 */
//   deletedAt: Date;
// }

// interface GenColumnsFormItemProps {
//   /**  */
//   columnId: number;
//   /**  */
//   tableId: number;
//   /**  */
//   columnName: string;
//   /**  */
//   columnComment: string;
//   /**  */
//   columnType: string;
//   /**  */
//   goType: string;
//   /**  */
//   goField: string;
//   /**  */
//   jsonField: string;
//   /**  */
//   isPk: string;
//   /**  */
//   isIncrement: string;
//   /**  */
//   isRequired: string;
//   /**  */
//   isInsert: string;
//   /**  */
//   isEdit: string;
//   /**  */
//   isList: string;
//   /**  */
//   isQuery: string;
//   /**  */
//   queryType: string;
//   /**  */
//   htmlType: string;
//   /**  */
//   dictType: string;
//   /**  */
//   sort: number;
//   /**  */
//   list: string;
//   /**  */
//   pk: number;
//   /**  */
//   required: number;
//   /**  */
//   superColumn: number;
//   /**  */
//   usableColumn: number;
//   /**  */
//   increment: number;
//   /**  */
//   insert: number;
//   /**  */
//   edit: number;
//   /**  */
//   query: number;
//   /**  */
//   remark: string;
//   /**  */
//   fkTableName: string;
//   /**  */
//   fkTableNameClass: string;
//   /**  */
//   fkTableNamePackage: string;
//   /**  */
//   fkLabelId: string;
//   /**  */
//   fkLabelName: string;
// }
// interface GenColumnsFormProps {
//   formInline: GenColumnsFormItemProps;
// }

// export type { GenColumnsFormItemProps, GenColumnsFormProps, GenColumns };
