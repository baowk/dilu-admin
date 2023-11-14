import dayjs from "dayjs";
import editForm from "../form.vue";
import { message } from "@/utils/message";
import {
  type SysOperaLogFormItemProps,
  getSysOperaLogPage,
  createSysOperaLog,
  updateSysOperaLog,
  delSysOperaLog
} from "@/api/sys/sys-opera-log";
import { addDialog } from "@/components/ReDialog";
import { type PaginationProps } from "@pureadmin/table";
import { reactive, ref, onMounted, h, toRaw } from "vue";

export function useSysOperaLog() {
  const qform = reactive({
    page: 1,
    pageSize: 10,
    status: 0
  });
  const formRef = ref();
  const dataList = ref([]);
  const loading = ref(true);
  //const switchLoadMap = ref({});
  //const { switchStyle } = usePublicHooks();
  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    currentPage: 1,
    background: true
  });
  const columns: TableColumnList = [
    {
      label: "主键",
      prop: "id",
      minWidth: 120
    },
    {
      label: "操作模块",
      prop: "title",
      minWidth: 120
    },
    {
      label: "操作类型",
      prop: "businessType",
      minWidth: 120
    },
    {
      label: "BusinessTypes",
      prop: "businessTypes",
      minWidth: 120
    },
    {
      label: "函数",
      prop: "method",
      minWidth: 120
    },
    {
      label: "请求方式",
      prop: "requestMethod",
      minWidth: 120
    },
    {
      label: "操作类型",
      prop: "operatorType",
      minWidth: 120
    },
    {
      label: "操作者",
      prop: "operName",
      minWidth: 120
    },
    {
      label: "部门名称",
      prop: "deptName",
      minWidth: 120
    },
    {
      label: "访问地址",
      prop: "operUrl",
      minWidth: 120
    },
    {
      label: "客户端ip",
      prop: "operIp",
      minWidth: 120
    },
    {
      label: "访问位置",
      prop: "operLocation",
      minWidth: 120
    },
    {
      label: "请求参数",
      prop: "operParam",
      minWidth: 120
    },
    {
      label: "操作状态",
      prop: "status",
      minWidth: 120
    },
    {
      label: "操作时间",
      prop: "operTime",
      minWidth: 120,
      formatter: ({ operTime }) => dayjs(operTime).format("YYYY-MM-DD HH:mm:ss")
    },
    {
      label: "返回数据",
      prop: "jsonResult",
      minWidth: 120
    },
    {
      label: "备注",
      prop: "remark",
      minWidth: 120
    },
    {
      label: "耗时",
      prop: "latencyTime",
      minWidth: 120
    },
    {
      label: "ua",
      prop: "userAgent",
      minWidth: 120
    },
    {
      label: "创建时间",
      prop: "createdAt",
      minWidth: 120,
      formatter: ({ createdAt }) =>
        dayjs(createdAt).format("YYYY-MM-DD HH:mm:ss")
    },
    {
      label: "最后更新时间",
      prop: "updatedAt",
      minWidth: 120,
      formatter: ({ updatedAt }) =>
        dayjs(updatedAt).format("YYYY-MM-DD HH:mm:ss")
    },
    {
      label: "创建者",
      prop: "createBy",
      minWidth: 120
    },
    {
      label: "更新者",
      prop: "updateBy",
      minWidth: 120
    }
  ];

  function handleDelete(row) {
    delSysOperaLog({ ids: [row.id] }).then(res => {
      if (res.code == 200) {
        message(`删除成功`, { type: "success" });
        onSearch();
      } else {
        message(`删除失败`, { type: "error" });
      }
    });
  }

  function handleSizeChange(val: number) {
    qform.pageSize = val;
    onSearch();
  }

  function handleCurrentChange(val: number) {
    qform.page = val;
    onSearch();
  }

  function handleSelectionChange(val) {
    console.log("handleSelectionChange", val);
  }

  async function onSearch() {
    loading.value = true;
    const { data } = await getSysOperaLogPage(toRaw(qform));
    dataList.value = data.list;
    pagination.total = data.total;
    pagination.pageSize = data.pageSize;
    pagination.currentPage = data.currentPage;

    setTimeout(() => {
      loading.value = false;
    }, 500);
  }

  const resetForm = formEl => {
    if (!formEl) return;
    formEl.resetFields();
    onSearch();
  };

  function openDialog(title = "新增", row?: SysOperaLogFormItemProps) {
    addDialog({
      title: `${title}操作日志`,
      props: {
        formInline: {
          id: row?.id ?? null,
          title: row?.title ?? null,
          businessType: row?.businessType ?? null,
          businessTypes: row?.businessTypes ?? null,
          method: row?.method ?? null,
          requestMethod: row?.requestMethod ?? null,
          operatorType: row?.operatorType ?? null,
          operName: row?.operName ?? null,
          deptName: row?.deptName ?? null,
          operUrl: row?.operUrl ?? null,
          operIp: row?.operIp ?? null,
          operLocation: row?.operLocation ?? null,
          operParam: row?.operParam ?? null,
          status: row?.status ?? null,
          operTime: row?.operTime ?? null,
          jsonResult: row?.jsonResult ?? null,
          remark: row?.remark ?? null,
          latencyTime: row?.latencyTime ?? null,
          userAgent: row?.userAgent ?? null
        }
      },
      width: "48%",
      draggable: true,
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(editForm, { ref: formRef }),
      beforeSure: (done, { options }) => {
        const FormRef = formRef.value.getRef();
        const curData = options.props.formInline as SysOperaLogFormItemProps;
        FormRef.validate(valid => {
          if (valid) {
            // 表单规则校验通过
            if (title === "新增") {
              createSysOperaLog(curData).then(res => {
                if (res.code == 200) {
                  message(res.msg, {
                    type: "success"
                  });
                  onSearch(); // 刷新表格数据
                } else {
                  message(res.msg, {
                    type: "error"
                  });
                }
              });
            } else {
              updateSysOperaLog(curData).then(res => {
                if (res.code == 200) {
                  message(res.msg, {
                    type: "success"
                  });
                  onSearch(); // 刷新表格数据
                } else {
                  message(res.msg, {
                    type: "error"
                  });
                }
              });
            }
            done(); // 关闭弹框
          }
        });
      }
    });
  }

  /** 数据权限 可自行开发 */
  // function handleDatabase() {}

  onMounted(() => {
    onSearch();
  });

  return {
    qform,
    loading,
    columns,
    dataList,
    pagination,
    onSearch,
    resetForm,
    openDialog,
    handleDelete,
    handleSizeChange,
    handleCurrentChange,
    handleSelectionChange
  };
}
