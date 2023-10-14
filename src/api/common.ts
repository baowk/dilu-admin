export type Result<T> = {
  code: number;
  msg?: string;
  reqId?: string;
  data?: T;
};

// export type PageResult<T> = {
//   code: number;
//   msg?: string;
//   reqId?: string;
//   /** 列表数据 */
//   data?: {
//     list: Array<T>;
//     /** 总条目数 */
//     total?: number;
//     /** 每页显示条目个数 */
//     pageSize?: number;
//     /** 当前页数 */
//     currentPage?: number;
//   };
// };

export type PageResult<T> = {
  list: Array<T>;
  /** 总条目数 */
  total?: number;
  /** 每页显示条目个数 */
  pageSize?: number;
  /** 当前页数 */
  currentPage?: number;
};
