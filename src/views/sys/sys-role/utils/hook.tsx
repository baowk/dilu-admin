import dayjs from "dayjs";
import editForm from "../form.vue";
import { message } from "@/utils/message";
import {
  getSysRolePage,
  createSysRole,
  updateSysRole,
  delSysRole
} from "@/api/sys/sys-role";
//import { ElMessageBox } from "element-plus";
//import { usePublicHooks } from "@/utils/hooks";
import { addDialog } from "@/components/ReDialog";
import { type SysRoleFormItemProps } from "@/api/sys/sys-role";
import { type PaginationProps } from "@pureadmin/table";
import { reactive, ref, onMounted, h, toRaw } from "vue";
import { on } from "events";

export function useSysRole() {
  const form = reactive({
    page: 1,
    pageSize: 10,
    name: null,
    status: 0,
    roleKey: null,
    flag: null,
    admin: 0
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
      label: "角色名称",
      prop: "name",
      minWidth: 120
    },
    {
      label: "状态",
      prop: "status",
      minWidth: 120
    },
    {
      label: "角色代码",
      prop: "roleKey",
      minWidth: 120
    },
    {
      label: "排序",
      prop: "roleSort",
      minWidth: 120
    },
    {
      label: "flag",
      prop: "flag",
      minWidth: 120
    },
    {
      label: "备注",
      prop: "remark",
      minWidth: 120
    },
    {
      label: "管理员",
      prop: "admin",
      minWidth: 120
    },
    {
      label: "数据权限",
      prop: "dataScope",
      minWidth: 120
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
      label: "创建时间",
      prop: "createdAt",
      minWidth: 120,
      formatter: ({ createTime }) =>
        dayjs(createTime).format("YYYY-MM-DD HH:mm:ss")
    },
    {
      label: "最后更新时间",
      prop: "updatedAt",
      minWidth: 120,
      formatter: ({ createTime }) =>
        dayjs(createTime).format("YYYY-MM-DD HH:mm:ss")
    },
    {
      label: "删除时间",
      prop: "deletedAt",
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
    delSysRole({ ids: [row.id] }).then(res => {
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
    onSearch();
  }

  function handleCurrentChange(val: number) {
    form.page = val;
    onSearch();
  }

  function handleSelectionChange(val) {
    console.log("handleSelectionChange", val);
  }

  async function onSearch() {
    loading.value = true;
    const { data } = await getSysRolePage(toRaw(form));
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

  function openDialog(title = "新增", row?: SysRoleFormItemProps) {
    addDialog({
      title: `${title}角色`,
      props: {
        formInline: {
          id: row?.id ?? 0,
          name: row?.name ?? "",
          status: row?.status ?? 0,
          roleKey: row?.roleKey ?? "",
          roleSort: row?.roleSort ?? 0,
          flag: row?.flag ?? "",
          remark: row?.remark ?? "",
          admin: row?.admin ?? 0,
          dataScope: row?.dataScope ?? ""
        }
      },
      width: "48%",
      draggable: true,
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(editForm, { ref: formRef }),
      beforeSure: (done, { options }) => {
        const FormRef = formRef.value.getRef();
        const curData = options.props.formInline as SysRoleFormItemProps;
        FormRef.validate(valid => {
          if (valid) {
            // 表单规则校验通过
            if (title === "新增") {
              createSysRole(curData).then(res => {
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
              updateSysRole(curData).then(res => {
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
