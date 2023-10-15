import dayjs from "dayjs";
import editForm from "../form.vue";
import { message } from "@/utils/message";
import {
  getBillPage,
  createBill,
  updateBill,
  delBill
} from "@/api/dental/bill";
//import { ElMessageBox } from "element-plus";
//import { usePublicHooks } from "@/utils/hooks";
import { addDialog } from "@/components/ReDialog";
import { type BillFormItemProps } from "@/api/dental/bill";
import { type PaginationProps } from "@pureadmin/table";
import { reactive, ref, onMounted, h, toRaw } from "vue";

export function useBill() {
  const form = reactive({
    id: 0,
    no: null,
    customerId: 0,
    userId: 0,
    teamId: 0,
    deptPath: null,
    total: null,
    realTotal: null,
    paidTotal: null,
    linkId: 0,
    tradeAt: null,
    tradeStatus: 0,
    dentalCount: 0,
    brand: 0,
    implantedCount: 0,
    implant: 0,
    implantDate: null,
    doctor: null,
    pack: 0,
    paybackDate: null,
    tags: null,
    prjName: null,
    otherPrj: null,
    remark: null
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
      label: "订单号",
      prop: "no",
      minWidth: 120
    },
    {
      label: "顾客",
      prop: "customerId",
      minWidth: 120
    },
    {
      label: "用户id",
      prop: "userId",
      minWidth: 120
    },
    // {
    //   label: "团队id",
    //   prop: "teamId",
    //   minWidth: 120
    // },
    // {
    //   label: "部门路径",
    //   prop: "deptPath",
    //   minWidth: 120
    // },
    {
      label: "金额",
      prop: "total",
      minWidth: 120
    },
    {
      label: "折后金额",
      prop: "realTotal",
      minWidth: 120
    },
    {
      label: "已支付金额",
      prop: "paidTotal",
      minWidth: 120
    },
    {
      label: "关联订单",
      prop: "linkId",
      minWidth: 120
    },
    {
      label: "交易日期",
      prop: "tradeAt",
      minWidth: 120,
      formatter: ({ createTime }) =>
        dayjs(createTime).format("YYYY-MM-DD HH:mm:ss")
    },
    {
      label: "交易类型",
      prop: "tradeStatus",
      minWidth: 120
    },
    {
      label: "颗数",
      prop: "dentalCount",
      minWidth: 120
    },
    {
      label: "品牌",
      prop: "brand",
      minWidth: 120
    },
    {
      label: "已种颗数",
      prop: "implantedCount",
      minWidth: 120
    },
    {
      label: "是否已种",
      prop: "implant",
      minWidth: 120
    },
    {
      label: "植入日期",
      prop: "implantDate",
      minWidth: 120,
      formatter: ({ createTime }) =>
        dayjs(createTime).format("YYYY-MM-DD HH:mm:ss")
    },
    {
      label: "医生",
      prop: "doctor",
      minWidth: 120
    },
    {
      label: "1 普通 2 半口 3 全口",
      prop: "pack",
      minWidth: 120
    },
    {
      label: "预定回款日期",
      prop: "paybackDate",
      minWidth: 120,
      formatter: ({ createTime }) =>
        dayjs(createTime).format("YYYY-MM-DD HH:mm:ss")
    },
    {
      label: "标签",
      prop: "tags",
      minWidth: 120
    },
    {
      label: "项目",
      prop: "prjName",
      minWidth: 120
    },
    {
      label: "其他项目",
      prop: "otherPrj",
      minWidth: 120
    },
    {
      label: "备注",
      prop: "remark",
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
    delBill({ ids: [row.id] }).then(res => {
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
    const { data } = await getBillPage(toRaw(form));
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

  function openDialog(title = "新增", row?: BillFormItemProps) {
    addDialog({
      title: `${title}账单`,
      props: {
        formInline: {
          id: row?.id ?? 0,
          no: row?.no ?? "",
          customerId: row?.customerId ?? 0,
          userId: row?.userId ?? 0,
          teamId: row?.teamId ?? 0,
          deptPath: row?.deptPath ?? "",
          total: row?.total ?? "",
          realTotal: row?.realTotal ?? "",
          paidTotal: row?.paidTotal ?? "",
          linkId: row?.linkId ?? 0,
          tradeAt: row?.tradeAt ?? "",
          tradeStatus: row?.tradeStatus ?? 0,
          dentalCount: row?.dentalCount ?? 0,
          brand: row?.brand ?? 0,
          implantedCount: row?.implantedCount ?? 0,
          implant: row?.implant ?? 0,
          implantDate: row?.implantDate ?? "",
          doctor: row?.doctor ?? "",
          pack: row?.pack ?? 0,
          paybackDate: row?.paybackDate ?? "",
          tags: row?.tags ?? "",
          prjName: row?.prjName ?? "",
          otherPrj: row?.otherPrj ?? "",
          remark: row?.remark ?? ""
        }
      },
      width: "52%",
      draggable: true,
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(editForm, { ref: formRef }),
      beforeSure: (done, { options }) => {
        const FormRef = formRef.value.getRef();
        const curData = options.props.formInline as BillFormItemProps;
        FormRef.validate(valid => {
          if (valid) {
            // 表单规则校验通过
            if (title === "新增") {
              console.log("curData", curData);
              createBill(curData).then(res => {
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
              updateBill(curData).then(res => {
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
