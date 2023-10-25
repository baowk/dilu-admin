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
import { type SysMember, getSysMemberPage } from "@/api/sys/sys-member";
import { addDialog } from "@/components/ReDialog";
import { type BillFormItemProps } from "@/api/dental/bill";
import { type PaginationProps } from "@pureadmin/table";
import { reactive, ref, onMounted, h, toRaw } from "vue";

export function useBill() {
  const qform = reactive({
    no: null,
    customerId: null,
    customerName: null,
    userId: null,
    name: null,
    teamId: 0,
    deptPath: null,
    linkId: 0,
    tradeType: null,
    brand: null,
    brandName: null,
    implant: 0,
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
    }
  ];

  const brandOptions = [
    {
      value: 1,
      label: "奥齿泰"
    },
    {
      value: 2,
      label: "皓圣"
    },
    {
      value: 3,
      label: "雅定"
    },
    {
      value: 4,
      label: "ITI"
    },
    {
      value: 5,
      label: "诺贝尔"
    }
  ];

  const tradeOptions = [
    {
      value: 1,
      label: "成交"
    },
    {
      value: 2,
      label: "补尾款"
    },
    {
      value: 3,
      label: "补上月欠款"
    },
    {
      value: 10,
      label: "退款"
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
      minWidth: 80
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
      label: "用户",
      prop: "userId",
      minWidth: 120,
      formatter: ({ userId }) => getUserName(userId)
    },
    // {
    //   label: "金额",
    //   prop: "amount",
    //   minWidth: 120
    // },
    {
      label: "折后金额",
      prop: "realAmount",
      minWidth: 120
    },
    {
      label: "已支付金额",
      prop: "paidAmount",
      minWidth: 120
    },
    // {
    //   label: "关联订单",
    //   prop: "linkId",
    //   minWidth: 120
    // },
    {
      label: "交易日期",
      prop: "tradeAt",
      minWidth: 120,
      formatter: ({ tradeAt }) => dayjs(tradeAt).format("YYYY-MM-DD HH:mm:ss")
    },
    {
      label: "交易类型",
      prop: "tradeType",
      minWidth: 80,
      formatter: ({ tradeType }) => {
        for (const t in tradeOptions) {
          if (tradeOptions[t].value == tradeType) {
            return tradeOptions[t].label;
          }
        }
      }
    },
    {
      label: "颗数",
      prop: "dentalCount",
      minWidth: 80,
      cellRenderer: ({ row }) => (
        <dev>
          {row.implantedCount}/{row.dentalCount}
        </dev>
      )
    },
    // {
    //   label: "已种颗数",
    //   prop: "implantedCount",
    //   minWidth: 80
    // },
    {
      label: "品牌",
      prop: "brand",
      minWidth: 80,
      formatter: ({ brand }) => {
        for (const t in brandOptions) {
          if (brandOptions[t].value == brand) {
            return brandOptions[t].label;
          }
        }
      }
    },
    // {
    //   label: "植入日期",
    //   prop: "implantDate",
    //   minWidth: 120,
    //   formatter: ({ implantDate }) =>
    //     dayjs(implantDate).format("YYYY-MM-DD HH:mm:ss")
    // },
    {
      label: "医生",
      prop: "doctor",
      minWidth: 120
    },
    {
      label: "全半口",
      prop: "pack",
      minWidth: 120,
      formatter: ({ pack }) => {
        for (const t in packOptions) {
          if (packOptions[t].value == pack) {
            return packOptions[t].label;
          }
        }
      }
    },
    // {
    //   label: "预定回款日期",
    //   prop: "paybackDate",
    //   minWidth: 120,
    //   formatter: ({ paybackDate }) =>
    //     dayjs(paybackDate).format("YYYY-MM-DD HH:mm:ss")
    // },
    {
      label: "标签",
      prop: "tags",
      minWidth: 120
    },
    // {
    //   label: "项目",
    //   prop: "prjName",
    //   minWidth: 120
    // },
    {
      label: "全科项目",
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
      width: 180,
      slot: "operation"
    }
  ];

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
          no: row?.no ?? "",
          customerId: row?.customerId ?? null,
          userId: row?.userId ?? null,
          teamId: row?.teamId ?? null,
          deptPath: row?.deptPath ?? "",
          amount: row?.amount ?? "",
          realAmount: row?.realAmount ?? "",
          paidAmount: row?.paidAmount ?? "",
          linkId: row?.linkId ?? 0,
          tradeAt: row?.tradeAt ?? new Date(),
          tradeType: row?.tradeType ?? null,
          dentalCount: row?.dentalCount ?? 0,
          brand: row?.brand ?? null,
          implantedCount: row?.implantedCount ?? 0,
          implant: row?.implant ?? null,
          implantDate: row?.implantDate ?? "",
          doctor: row?.doctor ?? "",
          pack: row?.pack ?? null,
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
    brandOptions,
    tradeOptions,
    members,
    identifyText,
    impactOptions,
    onSearch,
    resetForm,
    openDialog,
    handleDelete,
    handleSizeChange,
    handleCurrentChange,
    handleSelectionChange
  };
}
