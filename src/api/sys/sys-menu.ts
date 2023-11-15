import { http } from "@/utils/http";
import { Result } from "@/api/common";
//import { SysMenu } from "@/api/sys/sys-menu.d";

//Api

/** 获取菜单管理列表 */
export const getSysMenuPage = (data?: object) => {
  return http.request<Result<Array<SysMenu>>>(
    "post",
    "/api/v1/sys/sys-menu/all",
    {
      data
    }
  );
};

/** 获取菜单管理列表 */
export const getSysMenuGrant = (data?: object) => {
  return http.request<Result<Array<SysMenu>>>(
    "post",
    "/api/v1/sys/sys-menu/grant",
    {
      data
    }
  );
};

/** 获取菜单 */
export const getSysMenu = (data?: object) => {
  return http.request<Result<SysMenu>>("post", "/api/v1/sys/sys-menu/get", {
    data
  });
};

/** 创建菜单 */
export const createSysMenu = (data?: object) => {
  return http.request<Result<SysMenu>>("post", "/api/v1/sys/sys-menu/create", {
    data
  });
};

/** 更新菜单 */
export const updateSysMenu = (data?: object) => {
  return http.request<Result<SysMenu>>("post", "/api/v1/sys/sys-menu/update", {
    data
  });
};

/** 删除菜单 */
export const delSysMenu = (data?: object) => {
  return http.request<Result<SysMenu>>("post", "/api/v1/sys/sys-menu/del", {
    data
  });
};

//Model

/** 菜单 */
interface SysMenu {
  /** 主键 */
  id: number;
  /** 菜单名 */
  menuName: string;
  /** 显示名称 */
  title: string;
  /** 图标 */
  icon: string;
  /** 路径 */
  path: string;
  /** 平台类型 */
  platformType: number;
  /** 菜单类型 1 分类 2菜单 3方法按钮 */
  menuType: number;
  /** 权限 */
  permission: string;
  /** 菜单父id */
  parentId: number;
  /** 是否缓存 */
  noCache: number;
  /** 前端组件路径 */
  component: string;
  /** 排序倒叙 */
  sort: number;
  /** 是否隐藏 */
  hidden: number;
  /** 创建者 */
  createBy: number;
  /** 更新者 */
  updateBy: number;
  /** 创建时间 */
  createdAt: Date;
  /** 最后更新时间 */
  updatedAt: Date;
  /** 删除时间 */
  deletedAt: Date;
}

interface SysMenuFormItemProps {
  higherDeptOptions: Record<string, unknown>[];
  /** 主键 */
  id: number;
  /** 菜单名 */
  menuName: string;
  /** 显示名称 */
  title: string;
  /** 图标 */
  icon: string;
  /** 路径 */
  path: string;
  /** 平台类型 */
  platformType: number;
  /** 菜单类型 1 分类 2菜单 3方法按钮 */
  menuType: number;
  /** 权限 */
  permission: string;
  /** 菜单父id */
  parentId: number;
  /** 是否缓存 */
  noCache: number;
  /** 前端组件路径 */
  component: string;
  /** 排序倒叙 */
  sort: number;
  /** 是否隐藏 */
  hidden: number;
}
interface SysMenuFormProps {
  formInline: SysMenuFormItemProps;
}

export type { SysMenuFormItemProps, SysMenuFormProps, SysMenu };
