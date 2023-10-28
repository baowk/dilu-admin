import dayjs from "dayjs";
import editForm from "../form.vue";
import { message } from "@/utils/message";
import {
  getSysMenuPage,
  createSysMenu,
  updateSysMenu,
  delSysMenu
} from "@/api/sys/sys-menu";
import { handleTree } from "@/utils/tree";
//import { usePublicHooks } from "@/utils/hooks";
import { addDialog } from "@/components/ReDialog";
import { type SysMenuFormItemProps } from "@/api/sys/sys-menu";
import { reactive, ref, onMounted, h, toRaw } from "vue";
import { cloneDeep, isAllEmpty } from "@pureadmin/utils";

export function useSysMenu() {
  const qform = reactive({
    title: null,
    menuType: null,
    platformType: null
  });
  const formRef = ref();
  const dataList = ref([]);
  const loading = ref(true);

  const platformOptions = [
    {
      value: 1,
      label: "平台"
    },
    {
      value: 2,
      label: "团队"
    }
  ];

  const menuOptions = [
    {
      value: 1,
      label: "分类"
    },
    {
      value: 2,
      label: "菜单"
    },
    {
      value: 3,
      label: "按钮"
    }
  ];

  const columns: TableColumnList = [
    // {
    //   label: "主键",
    //   prop: "id",
    //   minWidth: 120
    // },
    // {
    //   label: "菜单名",
    //   prop: "menuName",
    //   minWidth: 120
    // },
    {
      label: "显示名称",
      prop: "title",
      minWidth: 200
    },
    {
      label: "图标",
      prop: "icon",
      minWidth: 80
    },
    {
      label: "路径",
      prop: "path",
      minWidth: 120
    },
    {
      label: "平台类型",
      prop: "platformType",
      minWidth: 80,
      formatter: ({ platformType }) => {
        for (const t in platformOptions) {
          if (platformOptions[t].value == platformType) {
            return platformOptions[t].label;
          }
        }
      }
    },
    {
      label: "菜单类型",
      prop: "menuType",
      minWidth: 80,
      formatter: ({ menuType }) => {
        for (const t in menuOptions) {
          if (menuOptions[t].value == menuType) {
            return menuOptions[t].label;
          }
        }
      }
    },
    {
      label: "权限",
      prop: "permission",
      minWidth: 120
    },
    {
      label: "是否缓存",
      prop: "noCache",
      minWidth: 80
    },
    {
      label: "前端组件路径",
      prop: "component",
      minWidth: 120
    },
    {
      label: "排序倒叙",
      prop: "sort",
      minWidth: 80
    },
    {
      label: "是否隐藏",
      prop: "hidden",
      minWidth: 80
    },
    {
      label: "创建者",
      prop: "createBy",
      minWidth: 80
    },
    {
      label: "更新者",
      prop: "updateBy",
      minWidth: 80
    },
    {
      label: "创建时间",
      prop: "createdAt",
      minWidth: 140,
      formatter: ({ createdAt }) =>
        dayjs(createdAt).format("YYYY-MM-DD HH:mm:ss")
    },
    {
      label: "最后更新时间",
      prop: "updatedAt",
      minWidth: 140,
      formatter: ({ updatedAt }) =>
        dayjs(updatedAt).format("YYYY-MM-DD HH:mm:ss")
    },
    {
      label: "操作",
      fixed: "right",
      width: 140,
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

  function formatHigherDeptOptions(treeList) {
    // 根据返回数据的status字段值判断追加是否禁用disabled字段，返回处理后的树结构，用于上级部门级联选择器的展示（实际开发中也是如此，不可能前端需要的每个字段后端都会返回，这时需要前端自行根据后端返回的某些字段做逻辑处理）
    if (!treeList || !treeList.length) return;
    const newTreeList = [];
    for (let i = 0; i < treeList.length; i++) {
      treeList[i].disabled = true;
      formatHigherDeptOptions(treeList[i].children);
      newTreeList.push(treeList[i]);
    }
    return newTreeList;
  }

  async function onSearch() {
    loading.value = true;
    const { data } = await getSysMenuPage(toRaw(qform));
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
    dataList.value = handleTree(newData); // 处理成树结构
    //console.log(dataList);
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
          higherDeptOptions: formatHigherDeptOptions(cloneDeep(dataList.value)),
          id: row?.id ?? 0,
          menuName: row?.menuName ?? null,
          title: row?.title ?? null,
          icon: row?.icon ?? "",
          path: row?.path ?? "",
          platformType: row?.platformType ?? 1,
          menuType: row?.menuType ?? 1,
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
    platformOptions,
    menuOptions,
    onSearch,
    resetForm,
    openDialog,
    handleDelete,
    handleSizeChange,
    handleCurrentChange,
    handleSelectionChange
  };
}
