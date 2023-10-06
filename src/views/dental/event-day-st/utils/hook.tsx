import dayjs from "dayjs";
import editForm from "../form.vue";
import { message } from "@/utils/message";
import {
  getEventDayStPage,
  createEventDaySt,
  updateEventDaySt,
  delEventDaySt
} from "@/api/dental/event-day-st";
//import { ElMessageBox } from "element-plus";
//import { usePublicHooks } from "@/utils/hooks";
import { addDialog } from "@/components/ReDialog";
import { type EventDayStFormItemProps } from "@/api/dental/event-day-st";
import { type PaginationProps } from "@pureadmin/table";
import { reactive, ref, onMounted, h, toRaw } from "vue";

export function useEventDaySt() {
  const form = reactive({
    id: 0,
    day: 0,
    teamId: 0,
    userId: 0,
    deptPath: null,
    newCustomerCnt: 0,
    firstDiagnosis: 0,
    furtherDiagnosis: 0,
    deal: 0,
    invitation: 0,
    rest: 0
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
      label: "时间",
      prop: "day",
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
      label: "部门路径",
      prop: "deptPath",
      minWidth: 120
    },
    {
      label: "留存",
      prop: "newCustomerCnt",
      minWidth: 120
    },
    {
      label: "初诊",
      prop: "firstDiagnosis",
      minWidth: 120
    },
    {
      label: "复诊",
      prop: "furtherDiagnosis",
      minWidth: 120
    },
    {
      label: "成交",
      prop: "deal",
      minWidth: 120
    },
    {
      label: "明日邀约",
      prop: "invitation",
      minWidth: 120
    },
    {
      label: "休息",
      prop: "rest",
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
      label: "创建者",
      prop: "createBy",
      minWidth: 120
    },
    {
      label: "更新者",
      prop: "updateBy",
      minWidth: 120
    },
    {
      label: "操作",
      fixed: "right",
      width: 240,
      slot: "operation"
    }
  ];

  function handleDelete(row) {
    delEventDaySt({ ids: [row.id] }).then(res => {
      if (res.code == 200) {
        message(`删除成功`, { type: "success" });
        onSearch();
      } else {
        message(`删除失败`, { type: "error" });
      }
    });
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
    const { data } = await getEventDayStPage(toRaw(form));
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

  function openDialog(title = "新增", row?: EventDayStFormItemProps) {
    addDialog({
      title: `${title}EventDaySt`,
      props: {
        formInline: {
          id: row?.id ?? 0,
          day: row?.day ?? 0,
          teamId: row?.teamId ?? 0,
          userId: row?.userId ?? 0,
          deptPath: row?.deptPath ?? "",
          newCustomerCnt: row?.newCustomerCnt ?? 0,
          firstDiagnosis: row?.firstDiagnosis ?? 0,
          furtherDiagnosis: row?.furtherDiagnosis ?? 0,
          deal: row?.deal ?? 0,
          invitation: row?.invitation ?? 0,
          rest: row?.rest ?? 0
        }
      },
      width: "48%",
      draggable: true,
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(editForm, { ref: formRef }),
      beforeSure: (done, { options }) => {
        const FormRef = formRef.value.getRef();
        const curData = options.props.formInline as EventDayStFormItemProps;
        FormRef.validate(valid => {
          if (valid) {
            // 表单规则校验通过
            if (title === "新增") {
              createEventDaySt(curData).then(res => {
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
              updateEventDaySt(curData).then(res => {
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
    form,
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
