import dayjs from "dayjs";
import editForm from "../form.vue";
import { message } from "@/utils/message";
import {
  getEventDayStPage,
  createEventDaySt,
  updateEventDaySt,
  delEventDaySt
} from "@/api/dental/event-day-st";

import { type SysMember, getSysMembers } from "@/api/sys/sys-member";
import { usePublicHooks } from "@/utils/hooks";
import { addDialog } from "@/components/ReDialog";
import { type EventDayStFormItemProps } from "@/api/dental/event-day-st";
import { type PaginationProps } from "@pureadmin/table";
import { reactive, ref, onMounted, h, toRaw } from "vue";

export function useEventDaySt() {
  const qform = reactive({
    page: 1,
    pageSize: 15,
    userId: null,
    deptPath: null,
    begin: null,
    end: null
  });
  const formRef = ref();
  const dataList = ref([]);
  const members = ref(Array<SysMember>);
  const loading = ref(true);
  //const switchLoadMap = ref({});
  const { switchStyle } = usePublicHooks();
  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    currentPage: 1,
    background: true
  });
  const columns: TableColumnList = [
    {
      label: "时间",
      prop: "day",
      minWidth: 110,
      formatter: ({ day }) =>
        dayjs(String(day), "YYYYMMDD").format("YYYY-MM-DD")
    },
    {
      label: "咨询师",
      prop: "userId",
      minWidth: 100,
      formatter: ({ userId }) => getUserName(userId)
    },
    {
      label: "留存",
      prop: "newCustomerCnt",
      minWidth: 80
    },
    {
      label: "初诊",
      prop: "firstDiagnosis",
      minWidth: 80
    },
    // {
    //   label: "初诊(转介绍)",
    //   prop: "firstDiagnosisReferred",
    //   minWidth: 80
    // },
    {
      label: "复诊",
      prop: "furtherDiagnosis",
      minWidth: 80
    },
    {
      label: "复查",
      prop: "recheck",
      minWidth: 80
    },
    {
      label: "成交",
      prop: "deal",
      minWidth: 80
    },
    {
      label: "明日邀约",
      prop: "invitation",
      minWidth: 80
    },
    {
      label: "休息",
      prop: "rest",
      minWidth: 80,
      cellRenderer: scope => (
        <el-switch
          v-model={scope.row.rest}
          active-value={1}
          inactive-value={2}
          active-text="正常"
          inactive-text="休息"
          inline-prompt
          style={switchStyle.value}
        />
      )
    },
    {
      label: "创建者",
      prop: "createBy",
      minWidth: 80,
      formatter: ({ createBy }) => getUserName(createBy)
    },
    // {
    //   label: "更新者",
    //   prop: "updateBy",
    //   minWidth: 80,
    //   formatter: ({ updateBy }) => getUserName(updateBy)
    // },
    // {
    //   label: "创建时间",
    //   prop: "createdAt",
    //   minWidth: 120,
    //   formatter: ({ createTime }) =>
    //     dayjs(createTime).format("YYYY-MM-DD HH:mm:ss")
    // },
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

  function getUserName(val): string {
    for (const i in members.value) {
      if (members.value[i].userId === val) {
        return members.value[i].name
          ? members.value[i].name
          : members.value[i].nickname;
      }
    }
  }

  function getMembers() {
    getSysMembers({ status: 1 }).then(res => {
      members.value = res.data;
    });
  }

  async function onSearch() {
    loading.value = true;
    const { data } = await getEventDayStPage(toRaw(qform));
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
      title: `${title}日留存`,
      props: {
        formInline: {
          id: row?.id ?? 0,
          day: row?.day ?? new Date(),
          teamId: row?.teamId ?? null,
          userId: row?.userId ?? null,
          deptPath: row?.deptPath ?? "",
          newCustomerCnt: row?.newCustomerCnt ?? 0,
          firstDiagnosis: row?.firstDiagnosis ?? 0,
          recheck: row?.recheck ?? 0,
          furtherDiagnosis: row?.furtherDiagnosis ?? 0,
          deal: row?.deal ?? 0,
          invitation: row?.invitation ?? 0,
          rest: row?.rest ?? 1
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
    getMembers();
    onSearch();
  });

  return {
    qform,
    loading,
    columns,
    dataList,
    pagination,
    members,
    switchStyle,
    getMembers,
    onSearch,
    resetForm,
    openDialog,
    handleDelete,
    handleSizeChange,
    handleCurrentChange,
    handleSelectionChange
  };
}
