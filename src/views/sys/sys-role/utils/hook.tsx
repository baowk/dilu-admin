import dayjs from "dayjs";
import editForm from "../form.vue";
import { message } from "@/utils/message";
import {
  getSysRolePage,
  createSysRole,
  updateSysRole,
  delSysRole,
  getSysRole
} from "@/api/sys/sys-role";
//import { ElMessageBox } from "element-plus";
//import { usePublicHooks } from "@/utils/hooks";
import { addDialog } from "@/components/ReDialog";
import { type SysRoleFormItemProps } from "@/api/sys/sys-role";
import { type PaginationProps } from "@pureadmin/table";
import { reactive, ref, onMounted, h, toRaw } from "vue";
import { cloneDeep, isAllEmpty } from "@pureadmin/utils";
import { handleTree } from "@/utils/tree";
import { getSysMenuGrant } from "@/api/sys/sys-menu";

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
  const qform = reactive({
    title: null,
    menuType: null,
    platformType: null
  });
  const formRef = ref();
  const dataList = ref([]);
  const loading = ref(true);
  const dataMenu = ref([]);
  const detail = ref();
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
      label: "备注",
      prop: "remark",
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

  function formatHigherDeptOptions(treeList) {
    // 根据返回数据的status字段值判断追加是否禁用disabled字段，返回处理后的树结构，用于上级部门级联选择器的展示（实际开发中也是如此，不可能前端需要的每个字段后端都会返回，这时需要前端自行根据后端返回的某些字段做逻辑处理）
    if (!treeList || !treeList.length) return;
    const newTreeList = [];
    for (let i = 0; i < treeList.length; i++) {
      treeList[i].disabled = false;
      formatHigherDeptOptions(treeList[i].children);
      newTreeList.push(treeList[i]);
    }
    return newTreeList;
  }

  async function getMenus() {
    loading.value = true;
    const { data } = await getSysMenuGrant(toRaw(qform));
    let newData = data;
    if (!isAllEmpty(qform.title)) {
      // 前端搜索部门名称
      newData = newData.filter(item => item.title.includes(qform.title));
    }
    if (!isAllEmpty(qform.platformType)) {
      // 前端搜索状态
      newData = newData.filter(
        item => item.platformType === qform.platformType
      );
    }
    dataMenu.value = handleTree(newData); // 处理成树结构
    //console.log(dataList);
    setTimeout(() => {
      loading.value = false;
    }, 500);
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
    detail.value = {};
    if (row && row.id) {
      getSysRole({ id: row.id }).then(res => {
        if (res.code == 200) {
          addDialog({
            title: `${title}角色`,
            props: {
              formInline: {
                higherDeptOptions: formatHigherDeptOptions(
                  cloneDeep(dataMenu.value)
                ),
                id: row?.id ?? null,
                name: res.data?.name ?? null,
                status: res.data?.status ?? null,
                roleKey: res.data?.roleKey ?? null,
                roleSort: res.data?.roleSort ?? null,
                remark: res.data?.remark ?? null,
                menuIds: res.data?.menuIds ?? null
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
              });
            }
          });
        }
      });
    } else {
      addDialog({
        title: `${title}角色`,
        props: {
          formInline: {
            higherDeptOptions: formatHigherDeptOptions(
              cloneDeep(dataMenu.value)
            ),
            id: null,
            name: null,
            status: null,
            roleKey: null,
            roleSort: null,
            remark: null,
            menuIds: null
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

              done(); // 关闭弹框
            }
          });
        }
      });
    }
  }

  /** 数据权限 可自行开发 */
  // function handleDatabase() {}

  onMounted(() => {
    getMenus();
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
