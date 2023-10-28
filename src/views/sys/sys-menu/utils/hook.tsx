import dayjs from "dayjs";
import editForm from "../form.vue";
import { message } from "@/utils/message";
import {
  getSysMenuPage,
  createSysMenu,
  updateSysMenu,
  delSysMenu
} from "@/api/sys/sys-menu";
//import { ElMessageBox } from "element-plus";
//import { usePublicHooks } from "@/utils/hooks";
import { addDialog } from "@/components/ReDialog";
import { type SysMenuFormItemProps } from "@/api/sys/sys-menu";
import { type PaginationProps } from "@pureadmin/table";
import { reactive, ref, onMounted, h, toRaw } from "vue";

export function useSysMenu() {
  const qform = reactive({});
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
      label: "菜单名",
      prop: "menuName",
      minWidth: 120
    },
    {
      label: "显示名称",
      prop: "title",
      minWidth: 120
    },
    {
      label: "图标",
      prop: "icon",
      minWidth: 120
    },
    {
      label: "路径",
      prop: "path",
      minWidth: 120
    },
    {
      label: "路径ids/分割",
      prop: "paths",
      minWidth: 120
    },
    {
      label: "菜单类型 1 分类 2菜单 3方法按钮",
      prop: "menuType",
      minWidth: 120
    },
    {
      label: "权限",
      prop: "permission",
      minWidth: 120
    },
    {
      label: "菜单父id",
      prop: "parentId",
      minWidth: 120
    },
    {
      label: "是否缓存",
      prop: "noCache",
      minWidth: 120
    },
    {
      label: "前端组件路径",
      prop: "component",
      minWidth: 120
    },
    {
      label: "排序倒叙",
      prop: "sort",
      minWidth: 120
    },
    {
      label: "是否隐藏",
      prop: "hidden",
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
      formatter: ({ createdAt }) =>
        dayjs(createdAt).format("YYYY-MM-DD HH:mm:ss")
    },
    {
      label: "最后更新时间",
      prop: "updatedAt",
      minWidth: 120,
      formatter: ({ updatedAt }) =>
        dayjs(updatedAt).format("YYYY-MM-DD HH:mm:ss")
    },
    {
      label: "删除时间",
      prop: "deletedAt",
      minWidth: 120,
      formatter: ({ deletedAt }) =>
        dayjs(deletedAt).format("YYYY-MM-DD HH:mm:ss")
    },
    {
      label: "操作",
      fixed: "right",
      width: 240,
      slot: "operation"
    }
  ];

  function handleDelete(row) {
    delSysMenu({ ids: [row.id] }).then(res => {
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
    const { data } = await getSysMenuPage(toRaw(qform));
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

  function openDialog(title = "新增", row?: SysMenuFormItemProps) {
    addDialog({
      title: `${title}菜单`,
      props: {
        formInline: {
          id: row?.id ?? 0,
          menuName: row?.menuName ?? "",
          title: row?.title ?? "",
          icon: row?.icon ?? "",
          path: row?.path ?? "",
          paths: row?.paths ?? "",
          menuType: row?.menuType ?? 0,
          permission: row?.permission ?? "",
          parentId: row?.parentId ?? 0,
          noCache: row?.noCache ?? 0,
          component: row?.component ?? "",
          sort: row?.sort ?? 0,
          hidden: row?.hidden ?? 0
        }
      },
      width: "48%",
      draggable: true,
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(editForm, { ref: formRef }),
      beforeSure: (done, { options }) => {
        const FormRef = formRef.value.getRef();
        const curData = options.props.formInline as SysMenuFormItemProps;
        FormRef.validate(valid => {
          if (valid) {
            // 表单规则校验通过
            if (title === "新增") {
              createSysMenu(curData).then(res => {
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
              updateSysMenu(curData).then(res => {
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
    qform,
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
