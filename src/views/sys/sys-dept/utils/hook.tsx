import dayjs from "dayjs";
import editForm from "../form.vue";
import { message } from "@/utils/message";
import {
  getDeptAll,
  createSysDept,
  updateSysDept,
  delSysDept
} from "@/api/sys/sys-dept";
import { handleTree } from "@/utils/tree";
import { addDialog } from "@/components/ReDialog";
import { type SysDeptFormItemProps } from "@/api/sys/sys-dept";
import { type PaginationProps } from "@pureadmin/table";
import { reactive, ref, onMounted, h, toRaw } from "vue";
import { cloneDeep, isAllEmpty } from "@pureadmin/utils";

export function useSysDept() {
  const form = reactive({
    id: 0,
    parentId: 0,
    deptPath: null,
    name: null,
    type: 0,
    principal: null,
    phone: null,
    email: null,
    sort: 0,
    status: 0,
    remark: null,
    teamId: 0
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
    // {
    //   label: "主键",
    //   prop: "id",
    //   minWidth: 120
    // },
    // {
    //   label: "父id",
    //   prop: "parentId",
    //   minWidth: 120
    // },
    // {
    //   label: "部门路径",
    //   prop: "deptPath",
    //   minWidth: 120
    // },
    {
      label: "部门名",
      prop: "name",
      minWidth: 120
    },
    {
      label: "类型",
      prop: "type",
      minWidth: 120
    },
    {
      label: "部门领导",
      prop: "principal",
      minWidth: 120
    },
    {
      label: "手机号",
      prop: "phone",
      minWidth: 120
    },
    {
      label: "邮箱",
      prop: "email",
      minWidth: 120
    },
    {
      label: "排序",
      prop: "sort",
      minWidth: 120
    },
    {
      label: "状态",
      prop: "status",
      minWidth: 120
    },
    {
      label: "备注",
      prop: "remark",
      minWidth: 120
    },
    {
      label: "团队id",
      prop: "teamId",
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
      formatter: ({ updatedAt }) =>
        dayjs(updatedAt).format("YYYY-MM-DD HH:mm:ss")
    },
    {
      label: "操作",
      fixed: "right",
      width: 160,
      slot: "operation"
    }
  ];

  function handleDelete(row) {
    delSysDept({ ids: [row.id] }).then(res => {
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
    const { data } = await getDeptAll(toRaw(form));

    let newData = data;
    if (!isAllEmpty(form.name)) {
      // 前端搜索部门名称
      newData = newData.filter(item => item.name.includes(form.name));
    }
    if (!isAllEmpty(form.status)) {
      // 前端搜索状态
      newData = newData.filter(item => item.status === form.status);
    }
    dataList.value = handleTree(newData); // 处理成树结构
    console.log(handleTree(newData));
    setTimeout(() => {
      loading.value = false;
    }, 500);
  }

  const resetForm = formEl => {
    if (!formEl) return;
    formEl.resetFields();
    onSearch();
  };

  function formatHigherDeptOptions(treeList) {
    // 根据返回数据的status字段值判断追加是否禁用disabled字段，返回处理后的树结构，用于上级部门级联选择器的展示（实际开发中也是如此，不可能前端需要的每个字段后端都会返回，这时需要前端自行根据后端返回的某些字段做逻辑处理）
    if (!treeList || !treeList.length) return;
    const newTreeList = [];
    for (let i = 0; i < treeList.length; i++) {
      treeList[i].disabled = treeList[i].status === 0 ? true : false;
      formatHigherDeptOptions(treeList[i].children);
      newTreeList.push(treeList[i]);
    }
    return newTreeList;
  }

  function openDialog(title = "新增", row?: SysDeptFormItemProps) {
    addDialog({
      title: `${title}部门`,
      props: {
        formInline: {
          higherDeptOptions: formatHigherDeptOptions(cloneDeep(dataList.value)),
          id: row?.id ?? 0,
          parentId: row?.parentId ?? 0,
          deptPath: row?.deptPath ?? "",
          name: row?.name ?? "",
          type: row?.type ?? 0,
          principal: row?.principal ?? "",
          phone: row?.phone ?? "",
          email: row?.email ?? "",
          sort: row?.sort ?? 0,
          status: row?.status ?? 0,
          remark: row?.remark ?? "",
          teamId: row?.teamId ?? 0
        }
      },
      width: "40%",
      draggable: true,
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(editForm, { ref: formRef }),
      beforeSure: (done, { options }) => {
        const FormRef = formRef.value.getRef();
        const curData = options.props.formInline as SysDeptFormItemProps;
        FormRef.validate(valid => {
          if (valid) {
            // 表单规则校验通过
            if (title === "新增") {
              createSysDept(curData).then(res => {
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
              updateSysDept(curData).then(res => {
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
