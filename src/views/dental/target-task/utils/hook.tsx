import dayjs from "dayjs";
import editForm from "../form.vue";
import { message } from "@/utils/message";
import {
  getTargetTaskPage,
  createTargetTask,
  updateTargetTask,
  delTargetTask
} from "@/api/dental/target-task";
import { type SysMember, getSysMembers } from "@/api/sys/sys-member";
import { addDialog } from "@/components/ReDialog";
import { type TargetTaskFormItemProps } from "@/api/dental/target-task";
import { type PaginationProps } from "@pureadmin/table";
import { reactive, ref, onMounted, h, toRaw } from "vue";

export function useTargetTask() {
  const qform = reactive({
    dayType: 30,
    page: 1,
    pageSize: 15
  });
  const formRef = ref();
  const dataList = ref([]);
  const loading = ref(true);
  const members = ref(Array<SysMember>);
  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    currentPage: 1,
    background: true
  });
  const taskOptions = [
    {
      value: 1,
      label: "天"
    },
    {
      value: 7,
      label: "周"
    },
    {
      value: 30,
      label: "月"
    }
  ];
  const columns: TableColumnList = [
    // {
    //   label: "主键",
    //   prop: "id",
    //   minWidth: 120
    // },
    {
      label: "时间类型",
      prop: "dayType",
      minWidth: 80,
      formatter: ({ dayType }) => {
        for (const t in taskOptions) {
          if (taskOptions[t].value == dayType) {
            return taskOptions[t].label;
          }
        }
      }
    },
    {
      label: "时间",
      prop: "day",
      minWidth: 90
    },
    // {
    //   label: "团队id",
    //   prop: "teamId",
    //   minWidth: 120
    // },
    {
      label: "咨询师",
      prop: "userId",
      minWidth: 100,
      formatter: ({ userId }) => getUserName(userId)
    },
    // {
    //   label: "部门路径",
    //   prop: "deptPath",
    //   minWidth: 120
    // },
    {
      label: "留存任务",
      prop: "newCustomerCnt",
      minWidth: 100
    },
    {
      label: "导诊任务",
      prop: "firstDiagnosis",
      minWidth: 100
    },
    {
      label: "成交任务",
      prop: "deal",
      minWidth: 100
    },
    {
      label: "创建者",
      prop: "createBy",
      minWidth: 100,
      formatter: ({ createBy }) => getUserName(createBy)
    },
    {
      label: "更新者",
      prop: "updateBy",
      minWidth: 100,
      formatter: ({ updateBy }) => getUserName(updateBy)
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
      width: 140,
      slot: "operation"
    }
  ];

  function handleDelete(row) {
    delTargetTask({ ids: [row.id] }).then(res => {
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

  function getMembers() {
    getSysMembers({ status: 1 }).then(res => {
      members.value = res.data;
    });
  }

  function getUserName(val): string {
    for (const i in members.value) {
      if (members.value[i].userId === val) {
        return members.value[i].name
          ? members.value[i].name
          : members.value[i].nickname;
      }
    }
  }

  async function onSearch() {
    loading.value = true;
    const { data } = await getTargetTaskPage(toRaw(qform));
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

  function openDialog(title = "新增", row?: TargetTaskFormItemProps) {
    const currentDate = new Date();
    const curday = currentDate.getFullYear() * 100 + currentDate.getMonth() + 1;
    addDialog({
      title: `${title}任务`,
      props: {
        formInline: {
          id: row?.id ?? 0,
          dayType: row?.dayType ?? 30,
          day: row?.day ?? curday,
          teamId: row?.teamId ?? 0,
          userId: row?.userId ?? null,
          deptPath: row?.deptPath ?? "",
          newCustomerCnt: row?.newCustomerCnt ?? 72,
          firstDiagnosis: row?.firstDiagnosis ?? 16,
          deal: row?.deal ?? 80000
        }
      },
      width: "48%",
      draggable: true,
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(editForm, { ref: formRef }),
      beforeSure: (done, { options }) => {
        const FormRef = formRef.value.getRef();
        const curData = options.props.formInline as TargetTaskFormItemProps;
        FormRef.validate(valid => {
          if (valid) {
            // 表单规则校验通过
            if (title === "新增") {
              createTargetTask(curData).then(res => {
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
              updateTargetTask(curData).then(res => {
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
    getMembers();
    onSearch();
  });

  return {
    qform,
    loading,
    columns,
    dataList,
    pagination,
    taskOptions,
    members,
    onSearch,
    resetForm,
    openDialog,
    handleDelete,
    handleSizeChange,
    handleCurrentChange,
    handleSelectionChange
  };
}
