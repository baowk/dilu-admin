import dayjs from "dayjs";
import editForm from "../form.vue";
import { message } from "@/utils/message";
import {
  getBillPage,
  createBill,
  updateBill,
  delBill,
  billExport
} from "@/api/dental/bill";
//import { ElMessageBox } from "element-plus";
//import { usePublicHooks } from "@/utils/hooks";
import { type SysMember, getSysMembers } from "@/api/sys/sys-member";
import { addDialog } from "@/components/ReDialog";
import { type BillFormItemProps } from "@/api/dental/bill";
import { type PaginationProps } from "@pureadmin/table";
import { reactive, ref, onMounted, h, toRaw } from "vue";

export function useBill() {
  const qform = reactive({
    page: 1,
    pageSize: 15,
    userId: null,
    name: null,
    teamId: 0,
    deptPath: null,
    linkId: 0,
    tradeType: null,
    brand: null,
    brandName: null,
    begin: null,
    end: null,
    pack: null,
    tags: null
  });

  const identifyText = ref("");
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

  const packOptions = [
    {
      value: 1,
      label: "多颗"
    },
    {
      value: 2,
      label: "半口"
    },
    {
      value: 3,
      label: "全口"
    },
    {
      value: 4,
      label: "全科"
    }
  ];

  const diagnosisOptions = [
    {
      value: 1,
      label: "初诊"
    },
    {
      value: 2,
      label: "复诊"
    },
    {
      value: 3,
      label: "新诊"
    }
  ];

  const sourceOptions = [
    {
      value: 1,
      label: "场地"
    },
    {
      value: 2,
      label: "转介绍"
    },
    {
      value: 3,
      label: "加班"
    }
  ];

  const tradeOptions = [
    {
      value: 1,
      label: "成交"
    },
    {
      value: 2,
      label: "补当月款"
    },
    {
      value: 3,
      label: "补上月款"
    },
    {
      value: 10,
      label: "退款"
    },
    {
      value: -1,
      label: "未成交"
    },
    {
      value: 9,
      label: "补种牙齿"
    }
  ];

  const impactOptions = [
    {
      value: 1,
      label: "未中"
    },
    {
      value: 2,
      label: "部分"
    },
    {
      value: 3,
      label: "已种"
    }
  ];

  const columns: TableColumnList = [
    {
      label: "主键",
      prop: "id",
      minWidth: 60
    },
    {
      label: "顾客",
      prop: "customerName",
      minWidth: 80
    },
    {
      label: "咨询师",
      prop: "userId",
      minWidth: 80,
      formatter: ({ userId }) => getUserName(userId)
    },
    {
      label: "折后金额",
      prop: "realAmount",
      minWidth: 90
    },
    {
      label: "已支付金额",
      prop: "paidAmount",
      minWidth: 90
    },
    {
      label: "收回欠款",
      prop: "debtAmount",
      minWidth: 90
    },
    {
      label: "退款",
      prop: "refundAmount",
      minWidth: 80
    },
    {
      label: "交易日期",
      prop: "tradeAt",
      minWidth: 100,
      formatter: ({ tradeAt }) => dayjs(tradeAt).format("YYYY-MM-DD")
    },
    {
      label: "交易类型",
      prop: "tradeType",
      minWidth: 90,
      formatter: ({ tradeType }) => {
        for (const t in tradeOptions) {
          if (tradeOptions[t].value == tradeType) {
            return tradeOptions[t].label;
          }
        }
      }
    },
    {
      label: "来源",
      prop: "source",
      minWidth: 90,
      formatter: ({ source }) => {
        for (const t in sourceOptions) {
          if (sourceOptions[t].value == source) {
            return sourceOptions[t].label;
          }
        }
      }
    },
    {
      label: "出诊类型",
      prop: "diagnosisType",
      minWidth: 90,
      formatter: ({ diagnosisType }) => {
        for (const t in diagnosisOptions) {
          if (diagnosisOptions[t].value == diagnosisType) {
            return diagnosisOptions[t].label;
          }
        }
      }
    },
    {
      label: "奥齿泰",
      prop: "brand1",
      minWidth: 80,
      cellRenderer: ({ row }) => (
        <dev>
          {row.brand1Impl}/{row.brand1}
        </dev>
      )
    },
    {
      label: "皓圣",
      prop: "brand2",
      minWidth: 80,
      cellRenderer: ({ row }) => (
        <dev>
          {row.brand2Impl}/{row.brand2}
        </dev>
      )
    },
    {
      label: "雅定",
      prop: "brand3",
      minWidth: 80,
      cellRenderer: ({ row }) => (
        <dev>
          {row.brand3Impl}/{row.brand3}
        </dev>
      )
    },
    {
      label: "ITI",
      prop: "brand4",
      minWidth: 80,
      cellRenderer: ({ row }) => (
        <dev>
          {row.brand4Impl}/{row.brand4}
        </dev>
      )
    },
    {
      label: "诺贝尔",
      prop: "brand5",
      minWidth: 80,
      cellRenderer: ({ row }) => (
        <dev>
          {row.brand5Impl}/{row.brand5}
        </dev>
      )
    },
    {
      label: "项目类型",
      prop: "pack",
      minWidth: 70,
      formatter: ({ pack }) => {
        for (const t in packOptions) {
          if (packOptions[t].value == pack) {
            return packOptions[t].label;
          }
        }
      }
    },
    {
      label: "全科项目",
      prop: "otherPrj",
      minWidth: 80
    },
    {
      label: "备注",
      prop: "remark",
      minWidth: 120
    },
    {
      label: "医生",
      prop: "doctor",
      minWidth: 80
    },
    {
      label: "标签",
      prop: "tags",
      minWidth: 80
    },
    {
      label: "创建时间",
      prop: "createdAt",
      minWidth: 160,
      formatter: ({ createTime }) =>
        dayjs(createTime).format("YYYY-MM-DD HH:mm:ss")
    },
    {
      label: "更新时间",
      prop: "updatedAt",
      minWidth: 160,
      formatter: ({ createTime }) =>
        dayjs(createTime).format("YYYY-MM-DD HH:mm:ss")
    },
    {
      label: "操作",
      width: 180,
      slot: "operation"
    }
  ];

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

  function exportExcel() {
    qform.responseType = "blob";
    billExport(qform);
  }

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
    const { data } = await getBillPage(toRaw(qform));
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
          no: row?.no ?? null,
          customerId: row?.customerId ?? null,
          customerName: row?.customerName ?? null,
          userId: row?.userId ?? null,
          teamId: row?.teamId ?? null,
          deptPath: row?.deptPath ?? null,
          amount: row?.amount ?? null,
          realAmount: row?.realAmount ?? null,
          paidAmount: row?.paidAmount ?? null,
          linkId: row?.linkId ?? 0,
          tradeAt: row?.tradeAt ?? new Date(),
          tradeType: row?.tradeType ?? null,
          source: row?.source ?? null,
          diagnosisType: row?.diagnosisType ?? null,
          brand1: row?.brand1 ?? 0,
          brand1Impl: row?.brand1Impl ?? 0,
          brand2: row?.brand2 ?? 0,
          brand2Impl: row?.brand2Impl ?? 0,
          brand3: row?.brand3 ?? 0,
          brand3Impl: row?.brand3Impl ?? 0,
          brand4: row?.brand4 ?? 0,
          brand4Impl: row?.brand4Impl ?? 0,
          brand5: row?.brand5 ?? 0,
          brand5Impl: row?.brand5Impl ?? 0,
          implant: row?.implant ?? null,
          implantDate: row?.implantDate ?? null,
          doctor: row?.doctor ?? null,
          pack: row?.pack ?? null,
          paybackDate: row?.paybackDate ?? null,
          tags: row?.tags ?? null,
          prjName: row?.prjName ?? null,
          otherPrj: row?.otherPrj ?? null,
          remark: row?.remark ?? null
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
              console.log("Create Form", curData);
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
              console.log("update Form", curData);
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
    getMembers();
    onSearch();
  });

  return {
    qform,
    loading,
    columns,
    dataList,
    pagination,
    packOptions,
    diagnosisOptions,
    sourceOptions,
    tradeOptions,
    members,
    identifyText,
    impactOptions,
    exportExcel,
    onSearch,
    resetForm,
    openDialog,
    handleDelete,
    handleSizeChange,
    handleCurrentChange,
    handleSelectionChange
  };
}
