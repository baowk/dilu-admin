import dayjs from "dayjs";
import editForm from "../form.vue";
import { message } from "@/utils/message";
import {
  getSummaryPlanDayPage,
  createSummaryPlanDay,
  updateSummaryPlanDay,
  delSummaryPlanDay
} from "@/api/dental/summary-plan-day";
//import { ElMessageBox } from "element-plus";
//import { usePublicHooks } from "@/utils/hooks";
import { addDialog } from "@/components/ReDialog";
import { type SysMember, getSysMemberPage } from "@/api/sys/sys-member";
import { type SummaryPlanDayFormItemProps } from "@/api/dental/summary-plan-day";
import { type PaginationProps } from "@pureadmin/table";
import { reactive, ref, onMounted, h, toRaw } from "vue";

export function useSummaryPlanDay() {
  const form = reactive({
    id: 0,
    day: 0,
    teamId: 0,
    userId: 0,
    deptPath: null,
    summary: null,
    plan: null
  });
  const formRef = ref();
  const dataList = ref([]);
  const loading = ref(true);
  const members = ref(Array<SysMember>);
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
      label: "天",
      prop: "day",
      minWidth: 120
    },
    {
      label: "用户id",
      prop: "userId",
      minWidth: 120,
      formatter: ({ userId }) => getUserName(userId)
    },
    {
      label: "部门路径",
      prop: "deptPath",
      minWidth: 120
    },
    {
      label: "今日总结",
      prop: "summary",
      minWidth: 120
    },
    {
      label: "明日计划",
      prop: "plan",
      minWidth: 120
    },
    {
      label: "创建时间",
      prop: "createdAt",
      minWidth: 120,
      formatter: ({ createTime }) =>
        dayjs(createTime).format("YYYY-MM-DD HH:mm:ss")
    },
    {
      label: "更新时间",
      prop: "updatedAt",
      minWidth: 120,
      formatter: ({ createTime }) =>
        dayjs(createTime).format("YYYY-MM-DD HH:mm:ss")
    },
    {
      label: "操作",
      fixed: "right",
      width: 240,
      slot: "operation"
    }
  ];

  function handleDelete(row) {
    delSummaryPlanDay({ ids: [row.id] }).then(res => {
      if (res.code == 200) {
        message(`删除成功`, { type: "success" });
        onSearch();
      } else {
        message(`删除失败`, { type: "error" });
      }
    });
  }

  function getMembers() {
    getSysMemberPage().then(res => {
      members.value = res.data.list;
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

  function handleSizeChange(val: number) {
    console.log(`${val} items per page`);
  }

  function handleCurrentChange(val: number) {
    console.log(`current page: ${val}`);
  }

  function handleSelectionChange(val) {
    console.log("handleSelectionChange", val);
  }

  async function onSearch() {
    loading.value = true;
    const { data } = await getSummaryPlanDayPage(toRaw(form));
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

  function openDialog(title = "新增", row?: SummaryPlanDayFormItemProps) {
    addDialog({
      title: `${title}总结与计划`,
      props: {
        formInline: {
          id: row?.id ?? 0,
          day: row?.day ?? null,
          teamId: row?.teamId ?? 0,
          userId: row?.userId ?? null,
          deptPath: row?.deptPath ?? "",
          summary: row?.summary ?? "",
          plan: row?.plan ?? ""
        }
      },
      width: "48%",
      draggable: true,
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(editForm, { ref: formRef }),
      beforeSure: (done, { options }) => {
        const FormRef = formRef.value.getRef();
        const curData = options.props.formInline as SummaryPlanDayFormItemProps;
        FormRef.validate(valid => {
          if (valid) {
            // 表单规则校验通过
            if (title === "新增") {
              createSummaryPlanDay(curData).then(res => {
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
              updateSummaryPlanDay(curData).then(res => {
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
    form,
    loading,
    columns,
    dataList,
    pagination,
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
