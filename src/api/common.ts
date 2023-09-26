export type Result = {
  code: number;
  msg?: string;
  reqId?: string;
  data?: any;
};

export type PageResult = {
  code: number;
  msg?: string;
  reqId?: string;
  /** 列表数据 */
  data?: {
    list: Array<any>;
    /** 总条目数 */
    total?: number;
    /** 每页显示条目个数 */
    pageSize?: number;
    /** 当前页数 */
    currentPage?: number;
  };
};
