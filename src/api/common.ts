import { http } from "@/utils/http";
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

export type Option<T> = {
  label: string;
  /** 值 */
  value: T;
};

/** 统计导出 */
export const fileExport = (mothed, uri: string, data?: object) => {
  http
    .download(mothed, uri, {
      data,
      responseType: "blob"
    })
    .then(res => {
      // data就是接口返回的文件流】
      const data = res.data;
      if (data) {
        const attrs = res.headers["content-disposition"].split(";"); // 获取文件名
        let fileName = "导出.xlsx";
        // 不用管fileName在第几个位置，只要=前面是fileName,就取=后面的值
        for (let i = 0, l = attrs.length; i < l; i++) {
          const temp = attrs[i].split("=");
          if (temp.length > 1 && trim(temp[0]) === "filename") {
            fileName = temp[1];
            break;
          }
        }
        fileName = decodeURIComponent(fileName);

        // 获取数据类型
        const type = res.headers["content-type"].split(";")[0];
        console.log(type);
        const blob = new Blob([data], { type: type });
        const a = document.createElement("a");

        // 创建URL
        const blobUrl = window.URL.createObjectURL(blob);
        a.download = fileName;
        a.href = blobUrl;
        document.body.appendChild(a);

        // 下载文件
        a.click();

        // 释放内存
        URL.revokeObjectURL(blobUrl);
        document.body.removeChild(a);
      } else {
        console.log("error", data);
      }
    });
};

function trim(str: string) {
  const reg = /^\s+|\s+$/g;
  return str.replace(reg, "");
}
