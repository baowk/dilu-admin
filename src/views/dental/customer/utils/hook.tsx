import dayjs from "dayjs";
import editForm from "../form.vue";
import { message } from "@/utils/message";
import {
  getCustomerPage,
  createCustomer,
  updateCustomer,
  delCustomer
} from "@/api/dental/customer";

import { type SysMember, getSysMemberPage } from "@/api/sys/sys-member";

//import { ElMessageBox } from "element-plus";
//import { usePublicHooks } from "@/utils/hooks";
import { addDialog } from "@/components/ReDialog";
import { type CustomerFormItemProps } from "@/api/dental/customer";
import { type PaginationProps } from "@pureadmin/table";
import { reactive, ref, onMounted, h, toRaw } from "vue";

export function useCustomer() {
  const form = reactive({
    page: 1,
    pageSize: 10,
    name: null,
    phone: null,
    wechat: null,
    gender: 0,
    age: 0,
    birthday: 0,
    source: null,
    address: null,
    remark: null,
    userId: 0,
    teamId: 0,
    deptPath: null,
    inviter: 0,
    inviterName: null
  });
  const formRef = ref();
  const dataList = ref([]);
  const loading = ref(true);
  const members = ref(Array<SysMember>);

  const genderOptions = [
    {
      value: 1,
      label: "男"
    },
    {
      value: 2,
      label: "女"
    }
  ];

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
      label: "姓名",
      prop: "name",
      minWidth: 120
    },
    {
      label: "手机号",
      prop: "phone",
      minWidth: 120
    },
    {
      label: "微信号",
      prop: "wechat",
      minWidth: 120
    },
    {
      label: "性别",
      prop: "gender",
      minWidth: 120,
      cellRenderer: ({ row }) => (
        <el-tag type={row.gender === 1 ? "" : "danger"} effect="plain">
          {row.gender === 1 ? "男" : "女"}
        </el-tag>
      )
    },
    {
      label: "年龄",
      prop: "age",
      minWidth: 120
    },
    {
      label: "生日",
      prop: "birthday",
      minWidth: 120,
      formatter: ({ birthday }) => {
        if (birthday != 0) {
          return dayjs(birthday).format("YYYY-MM-DD");
        }
        return "";
      }
    },
    {
      label: "来源",
      prop: "source",
      minWidth: 120
    },
    {
      label: "地址",
      prop: "address",
      minWidth: 120
    },
    {
      label: "描述",
      prop: "remark",
      minWidth: 120
    },
    {
      label: "咨询师",
      prop: "userId",
      minWidth: 120,
      formatter: ({ userId }) => getUserName(userId)
    },
    // {
    //   label: "部门路径",
    //   prop: "deptPath",
    //   minWidth: 120
    // },
    {
      label: "邀请人名",
      prop: "inviterName",
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
      formatter: ({ updatedAt }) =>
        dayjs(updatedAt).format("YYYY-MM-DD HH:mm:ss")
    },
    {
      label: "操作",
      fixed: "right",
      width: 240,
      slot: "operation"
    }
  ];

  function handleDelete(row) {
    delCustomer({ ids: [row.id] }).then(res => {
      if (res.code == 200) {
        message(`删除成功`, { type: "success" });
        onSearch();
      } else {
        message(`删除失败`, { type: "error" });
      }
    });
  }

  function handleSizeChange(val: number) {
    form.pageSize = val;
  }

  function handleCurrentChange(val: number) {
    form.page = val;
  }

  function handleSelectionChange(val) {
    console.log("handleSelectionChange", val);
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

  async function onSearch() {
    loading.value = true;
    const { data } = await getCustomerPage(toRaw(form));
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

  function openDialog(title = "新增", row?: CustomerFormItemProps) {
    addDialog({
      title: `${title}客户`,
      props: {
        formInline: {
          id: row?.id ?? 0,
          name: row?.name ?? "",
          phone: row?.phone ?? "",
          wechat: row?.wechat ?? "",
          gender: row?.gender ?? null,
          age: row?.age ?? null,
          birthday: row?.birthday ?? dayjs("1970-01-01"),
          source: row?.source ?? "",
          address: row?.address ?? "",
          remark: row?.remark ?? "",
          userId: row?.userId ?? 0,
          teamId: row?.teamId ?? 0,
          deptPath: row?.deptPath ?? "",
          inviter: row?.inviter ?? 0,
          inviterName: row?.inviterName ?? ""
        }
      },
      width: "48%",
      draggable: true,
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(editForm, { ref: formRef }),
      beforeSure: (done, { options }) => {
        const FormRef = formRef.value.getRef();
        const curData = options.props.formInline as CustomerFormItemProps;
        FormRef.validate(valid => {
          if (valid) {
            // 表单规则校验通过
            if (title === "新增") {
              createCustomer(curData).then(res => {
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
              updateCustomer(curData).then(res => {
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
    genderOptions,
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
