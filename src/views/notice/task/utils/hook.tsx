import dayjs from "dayjs";
import editForm from "../form.vue";
import { message } from "@/utils/message";
import {
  type TaskFormItemProps,
  getTaskPage,
  createTask,
  updateTask,
  delTask
} from "@/api/notice/task";
import { addDialog } from "@/components/ReDialog";
import { type PaginationProps } from "@pureadmin/table";
import { reactive, ref, onMounted, h, toRaw } from "vue";

export function useTask() {
  const qform = reactive({
    page: 1,
    pageSize: 10,
    status: null,
    reminderStatus: null
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

  const statusOptions = [
    {
      value: 1,
      label: "启用"
    },
    {
      value: 2,
      label: "关闭"
    }
  ];

  const reminderStatusOptions = [
    {
      value: 1,
      label: "提醒"
    },
    {
      value: 2,
      label: "不提醒"
    }
  ];

  const columns: TableColumnList = [
    {
      label: "主键",
      prop: "id",
      minWidth: 120
    },
    {
      label: "团队id",
      prop: "teamId",
      minWidth: 120
    },
    {
      label: "用户id",
      prop: "userId",
      minWidth: 120
    },
    {
      label: "任务标题",
      prop: "title",
      minWidth: 120
    },
    {
      label: "任务内容",
      prop: "content",
      minWidth: 120
    },
    {
      label: "任务类型",
      prop: "taskType",
      minWidth: 120
    },
    {
      label: "操作类型",
      prop: "op",
      minWidth: 120
    },
    {
      label: "操作id",
      prop: "opId",
      minWidth: 120
    },
    {
      label: "开始时间",
      prop: "beginAt",
      minWidth: 120,
      formatter: ({ beginAt }) => dayjs(beginAt).format("YYYY-MM-DD HH:mm:ss")
    },
    {
      label: "结束时间",
      prop: "endAt",
      minWidth: 120,
      formatter: ({ endAt }) => dayjs(endAt).format("YYYY-MM-DD HH:mm:ss")
    },
    {
      label: "提醒时间",
      prop: "reminderTime",
      minWidth: 120,
      formatter: ({ reminderTime }) =>
        dayjs(reminderTime).format("YYYY-MM-DD HH:mm:ss")
    },
    {
      label: "状态",
      prop: "status",
      minWidth: 120,
      formatter: ({ status }) => {
        for (const t in statusOptions) {
          if (statusOptions[t].value == status) {
            return statusOptions[t].label;
          }
        }
      }
    },
    {
      label: "提醒状态",
      prop: "reminderStatus",
      minWidth: 120,
      formatter: ({ reminderStatus }) => {
        for (const t in reminderStatusOptions) {
          if (reminderStatusOptions[t].value == reminderStatus) {
            return reminderStatusOptions[t].label;
          }
        }
      }
    },
    {
      label: "创建时间",
      prop: "createdAt",
      minWidth: 120,
      formatter: ({ createdAt }) =>
        dayjs(createdAt).format("YYYY-MM-DD HH:mm:ss")
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
    delTask({ ids: [row.id] }).then(res => {
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
    const { code, msg, data } = await getTaskPage(toRaw(qform));
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

  function openDialog(title = "新增", row?: TaskFormItemProps) {
    addDialog({
      title: `${title}Task`,
      props: {
        formInline: {
          id: row?.id ?? null,
          teamId: row?.teamId ?? null,
          userId: row?.userId ?? null,
          title: row?.title ?? null,
          content: row?.content ?? null,
          taskType: row?.taskType ?? null,
          op: row?.op ?? null,
          opId: row?.opId ?? null,
          beginAt: row?.beginAt ?? null,
          endAt: row?.endAt ?? null,
          reminderTime: row?.reminderTime ?? null,
          status: row?.status ?? null,
          reminderStatus: row?.reminderStatus ?? null
        }
      },
      width: "48%",
      draggable: true,
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(editForm, { ref: formRef }),
      beforeSure: (done, { options }) => {
        const FormRef = formRef.value.getRef();
        const curData = options.props.formInline as TaskFormItemProps;
        FormRef.validate(valid => {
          if (valid) {
            // 表单规则校验通过
            if (title === "新增") {
              createTask(curData).then(res => {
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
              updateTask(curData).then(res => {
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
    statusOptions,
    reminderStatusOptions,
    onSearch,
    resetForm,
    openDialog,
    handleDelete,
    handleSizeChange,
    handleCurrentChange,
    handleSelectionChange
  };
}
