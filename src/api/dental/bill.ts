import { http } from "@/utils/http";
import { Result, PageResult } from "@/api/common";
//import { Bill } from "@/api/dental/bill.d";

//Api

/** 获取账单管理列表 */
export const getBillPage = (data?: object) => {
  return http.request<Result<PageResult<Bill>>>(
    "post",
    "/api/v1/dental/bill/page",
    {
      data
    }
  );
};

/** 获取账单 */
export const getBill = (data?: object) => {
  return http.request<Result<Bill>>("post", "/api/v1/dental/bill/get", {
    data
  });
};

/** 创建账单 */
export const createBill = (data?: object) => {
  return http.request<Result<Bill>>("post", "/api/v1/dental/bill/create", {
    data
  });
};

/** 更新账单 */
export const updateBill = (data?: object) => {
  return http.request<Result<Bill>>("post", "/api/v1/dental/bill/update", {
    data
  });
};

/** 删除账单 */
export const delBill = (data?: object) => {
  return http.request<Result<Bill>>("post", "/api/v1/dental/bill/del", {
    data
  });
};

/** 智能识别 */
export const identify = (data?: object) => {
  return http.request<Result<BillFormItemProps>>(
    "post",
    "/api/v1/dental/bill/identify",
    {
      data
    }
  );
};

/** 统计查询 */
export const stQuery = (data?: object) => {
  return http.request<Result<BillFormItemProps>>(
    "post",
    "/api/v1/dental/st/query",
    {
      data
    }
  );
};

/** 日报表 */
export const stDay = (data?: object) => {
  return http.request<Result<Array<string>>>("post", "/api/v1/dental/st/day", {
    data
  });
};

/** 月报表 */
export const stMonth = (data?: object) => {
  return http.request<Result<Array<string>>>(
    "post",
    "/api/v1/dental/st/month",
    {
      data
    }
  );
};

//Model

/** 账单 */
interface Bill {
  /** 主键 */
  id: number;
  /** 订单号 */
  no: string;
  /** 顾客 */
  customerId: number;
  /** 用户id */
  userId: number;
  /** 团队id */
  teamId: number;
  /** 部门路径 */
  deptPath: string;
  /** 金额 */
  total: string;
  /** 折后金额 */
  realTotal: string;
  /** 已支付金额 */
  paidTotal: string;
  /** 关联订单 */
  linkId: number;
  /** 交易日期 */
  tradeAt: Date;
  /** 交易类型1 成交 2补尾款  3补上月欠款 10退款 */
  tradeType: number;
  /** 颗数 */
  dentalCount: number;
  /** 品牌 */
  brand: number;
  /** 已种颗数 */
  implantedCount: number;
  /** 是否已种 */
  implant: number;
  /** 植入日期 */
  implantDate: Date;
  /** 医生 */
  doctor: string;
  /** 1 普通 2 半口 3 全口 */
  pack: number;
  /** 预定回款日期 */
  paybackDate: Date;
  /** 标签 */
  tags: string;
  /** 项目 */
  prjName: string;
  /** 其他项目 */
  otherPrj: string;
  /** 备注 */
  remark: string;
  /** 创建时间 */
  createdAt: Date;
  /** 更新时间 */
  updatedAt: Date;
}

interface BillFormItemProps {
  /**智能之别模板文本 */
  text?: string;
  /** 主键 */
  id: number;
  /** 订单号 */
  no: string;
  /** 顾客 */
  customerId: number;
  /** 顾客名 */
  customerName: string;
  /** 顾客列表 */
  customers: [];
  /** 用户id */
  userId: number;
  name: string;
  /** 团队id */
  teamId: number;
  /** 部门路径 */
  deptPath: string;
  /** 金额 */
  amount: string;
  /** 折后金额 */
  realAmount: string;
  /** 已支付金额 */
  paidAmount: string;
  /** 关联订单 */
  linkId: number;
  /** 交易日期 */
  tradeAt: Date;
  /** 交易类型1 成交 2补尾款  3补上月欠款 10退款 */
  tradeType: number;
  /** 颗数 */
  dentalCount: number;
  /** 品牌 */
  brand: number;
  brandName?: string;
  /** 已种颗数 */
  implantedCount: number;
  /** 是否已种 */
  implant: number;
  /** 植入日期 */
  implantDate: Date;
  /** 医生 */
  doctor: string;
  /** 1 普通 2 半口 3 全口 */
  pack: number;
  /** 预定回款日期 */
  paybackDate: Date;
  /** 标签 */
  tags: string;
  /** 项目 */
  prjName: string;
  /** 其他项目 */
  otherPrj: string;
  /** 备注 */
  remark: string;
}
interface BillFormProps {
  formInline: BillFormItemProps;
}

interface BillUserSt {
  userId: number;
  name: string;
  target: string; //目标
  newCustomerCnt: number; //留存任务
  firstDiagnosis: number; //导诊任务
  deal: string; //成交
  paid: string; //实收
  debt: string; //补上月欠款
  refund: string; //退款
}

interface BillReport {
  data: string;
}

export type { BillFormItemProps, BillFormProps, Bill, BillUserSt, BillReport };
