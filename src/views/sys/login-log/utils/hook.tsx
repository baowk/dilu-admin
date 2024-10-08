import dayjs from "dayjs";
import editForm from "../form.vue";
import { message } from "@/utils/message";
import {type LoginLogFormItemProps, getLoginLogPage, createLoginLog, updateLoginLog, delLoginLog } from "@/api/sys/login-log";
import { addDialog } from "@/components/ReDialog";
import { type PaginationProps } from "@pureadmin/table";
import { reactive, ref, onMounted, h, toRaw } from "vue";

export function useLoginLog() {
  const qform = reactive({
    page: 1,
    pageSize: 10,
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
      label: "id",
      prop: "id",
      minWidth: 120
    },
    {
      label: "用户id",
      prop: "uid",
      minWidth: 120
    },
    {
      label: "登录方式",
      prop: "method",
      minWidth: 120
    },
    {
      label: "登录ip",
      prop: "ip",
      minWidth: 120
    },
    {
      label: "地域",
      prop: "region",
      minWidth: 120
    },
    {
      label: "客户端",
      prop: "clientId",
      minWidth: 120
    },
    {
      label: "操作系统",
      prop: "clientVer",
      minWidth: 120
    },
    {
      label: "操作系统",
      prop: "os",
      minWidth: 120
    },
    {
      label: "操作系统版本",
      prop: "osVer",
      minWidth: 120
    },
    {
      label: "更新时间",
      prop: "updatedAt",
      minWidth: 120,
      formatter: ({ updatedAt }) =>
        dayjs(updatedAt).format("YYYY-MM-DD HH:mm:ss")
    },
    {
      label: "操作",
      fixed: "right",
      width: 140,
      slot: "operation"
    }
  ];

  function handleDelete(row) {
    delLoginLog({ ids: [row.id] }).then(res => {
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
    const { code, msg, data } = await getLoginLogPage(toRaw(qform));
    if (code !== 200) {
      loading.value = false;
      message(msg, { type: "error" });
      return;
    }
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

  function openDialog(title = "新增", row?: LoginLogFormItemProps) {
    addDialog({
      title: `${title}LoginLog`,
      props: {
        formInline: {
          id: row?.id ?? null,
          uid: row?.uid ?? null,
          method: row?.method ?? null,
          ip: row?.ip ?? null,
          region: row?.region ?? null,
          clientId: row?.clientId ?? null,
          clientVer: row?.clientVer ?? null,
          os: row?.os ?? null,
          osVer: row?.osVer ?? null,
        }
      },
      width: "48%",
      draggable: true,
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(editForm, { ref: formRef }),
      beforeSure: (done, { options }) => {
        const FormRef = formRef.value.getRef();
        const curData = options.props.formInline as LoginLogFormItemProps;
        FormRef.validate(valid => {
          if (valid) {
            // 表单规则校验通过
            if (title === "新增") {
              createLoginLog(curData).then(res => {
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
              updateLoginLog(curData).then(res => {
                if (res.code == 200) {
                  message(res.msg, {
                    type: "success"
                  });
                  onSearch(); // 刷新表格数据
                } else {
                  message( res.msg, {
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
