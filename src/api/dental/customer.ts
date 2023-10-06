import { http } from "@/utils/http";
import { Result, PageResult } from "@/api/common";
//import { Customer } from "@/api/dental/customer.d";

//Api

/** 获取客户管理列表 */
export const getCustomerPage = (data?: object) => {
  return http.request<Result<PageResult<Customer>>>(
    "post",
    "/api/v1/dental/customer/page",
    {
      data
    }
  );
};

/** 获取客户 */
export const getCustomer = (data?: object) => {
  return http.request<Result<Customer>>("post", "/api/v1/dental/customer/get", {
    data
  });
};

/** 创建客户 */
export const createCustomer = (data?: object) => {
  return http.request<Result<Customer>>(
    "post",
    "/api/v1/dental/customer/create",
    {
      data
    }
  );
};

/** 更新客户 */
export const updateCustomer = (data?: object) => {
  return http.request<Result<Customer>>(
    "post",
    "/api/v1/dental/customer/update",
    {
      data
    }
  );
};

/** 删除客户 */
export const delCustomer = (data?: object) => {
  return http.request<Result<Customer>>("post", "/api/v1/dental/customer/del", {
    data
  });
};

//Model

/** 客户 */
interface Customer {
  /** 主键 */
  id: number;
  /** 姓名 */
  name: string;
  /** 手机号 */
  phone: string;
  /** 微信号 */
  wechat: string;
  /** 性别 */
  gender: number;
  /** 年龄 */
  age: number;
  /** 生日 */
  birthday: number;
  /** 来源 */
  source: string;
  /** 地址 */
  address: string;
  /** 描述 */
  remark: string;
  /** 用户id */
  userId: number;
  /** 团队id */
  teamId: number;
  /** 部门路径 */
  deptPath: string;
  /** 邀请人 */
  inviter: number;
  /** 邀请人名 */
  inviterName: string;
  /** 创建时间 */
  createdAt: Date;
  /** 更新时间 */
  updatedAt: Date;
}

interface CustomerFormItemProps {
  /** 主键 */
  id: number;
  /** 姓名 */
  name: string;
  /** 手机号 */
  phone: string;
  /** 微信号 */
  wechat: string;
  /** 性别 */
  gender: number;
  /** 年龄 */
  age: number;
  /** 生日 */
  birthday: number;
  /** 来源 */
  source: string;
  /** 地址 */
  address: string;
  /** 描述 */
  remark: string;
  /** 用户id */
  userId: number;
  /** 团队id */
  teamId: number;
  /** 部门路径 */
  deptPath: string;
  /** 邀请人 */
  inviter: number;
  /** 邀请人名 */
  inviterName: string;
}
interface CustomerFormProps {
  formInline: CustomerFormItemProps;
}

export type { CustomerFormItemProps, CustomerFormProps, Customer };
