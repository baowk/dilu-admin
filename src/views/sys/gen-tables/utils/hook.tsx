import dayjs from "dayjs";
import editForm from "../form.vue";
import { message } from "@/utils/message";
import {
  getGenTablesPage,
  createGenTables,
  updateGenTables,
  delGenTables
} from "@/api/sys/gen-tables";
//import { ElMessageBox } from "element-plus";
//import { usePublicHooks } from "@/utils/hooks";
import { addDialog } from "@/components/ReDialog";
import { type GenTablesFormItemProps } from "@/api/sys/gen-tables";
import { type PaginationProps } from "@pureadmin/table";
import { reactive, ref, onMounted, h, toRaw } from "vue";

export function useGenTables() {
  const qform = reactive({
    page: 1,
    pageSize: 10
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
      label: "",
      prop: "tableId",
      minWidth: 120
    },
    {
      label: "",
      prop: "dbName",
      minWidth: 120
    },
    {
      label: "",
      prop: "tableName",
      minWidth: 120
    },
    {
      label: "",
      prop: "tableComment",
      minWidth: 120
    },
    {
      label: "",
      prop: "className",
      minWidth: 120
    },
    {
      label: "",
      prop: "tplCategory",
      minWidth: 120
    },
    {
      label: "",
      prop: "packageName",
      minWidth: 120
    },
    {
      label: "",
      prop: "moduleName",
      minWidth: 120
    },
    {
      label: "前端文件名",
      prop: "moduleFrontName",
      minWidth: 120
    },
    {
      label: "",
      prop: "businessName",
      minWidth: 120
    },
    {
      label: "",
      prop: "functionName",
      minWidth: 120
    },
    {
      label: "",
      prop: "functionAuthor",
      minWidth: 120
    },
    {
      label: "",
      prop: "pkColumn",
      minWidth: 120
    },
    {
      label: "",
      prop: "pkGoField",
      minWidth: 120
    },
    {
      label: "",
      prop: "pkJsonField",
      minWidth: 120
    },
    {
      label: "",
      prop: "options",
      minWidth: 120
    },
    {
      label: "",
      prop: "treeCode",
      minWidth: 120
    },
    {
      label: "",
      prop: "treeParentCode",
      minWidth: 120
    },
    {
      label: "",
      prop: "treeName",
      minWidth: 120
    },
    {
      label: "",
      prop: "tree",
      minWidth: 120
    },
    {
      label: "",
      prop: "crud",
      minWidth: 120
    },
    {
      label: "",
      prop: "remark",
      minWidth: 120
    },
    {
      label: "",
      prop: "isDataScope",
      minWidth: 120
    },
    {
      label: "",
      prop: "isActions",
      minWidth: 120
    },
    {
      label: "",
      prop: "isAuth",
      minWidth: 120
    },
    {
      label: "",
      prop: "isLogicalDelete",
      minWidth: 120
    },
    {
      label: "",
      prop: "logicalDelete",
      minWidth: 120
    },
    {
      label: "",
      prop: "logicalDeleteColumn",
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
      label: "操作",
      fixed: "right",
      width: 240,
      slot: "operation"
    }
  ];

  function handleDelete(row) {
    delGenTables({ ids: [row.id] }).then(res => {
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
    onSearch();
  }

  async function onSearch() {
    loading.value = true;
    const { data } = await getGenTablesPage(toRaw(qform));
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

  function openDialog(title = "新增", row?: GenTablesFormItemProps) {
    addDialog({
      title: `${title}GenTables`,
      props: {
        formInline: {
          tableId: row?.tableId ?? 0,
          dbName: row?.dbName ?? "",
          tableName: row?.tableName ?? "",
          tableComment: row?.tableComment ?? "",
          className: row?.className ?? "",
          tplCategory: row?.tplCategory ?? "",
          packageName: row?.packageName ?? "",
          moduleName: row?.moduleName ?? "",
          moduleFrontName: row?.moduleFrontName ?? "",
          businessName: row?.businessName ?? "",
          functionName: row?.functionName ?? "",
          functionAuthor: row?.functionAuthor ?? "",
          pkColumn: row?.pkColumn ?? "",
          pkGoField: row?.pkGoField ?? "",
          pkJsonField: row?.pkJsonField ?? "",
          options: row?.options ?? "",
          treeCode: row?.treeCode ?? "",
          treeParentCode: row?.treeParentCode ?? "",
          treeName: row?.treeName ?? "",
          tree: row?.tree ?? 0,
          crud: row?.crud ?? 0,
          remark: row?.remark ?? "",
          isDataScope: row?.isDataScope ?? 0,
          isActions: row?.isActions ?? 0,
          isAuth: row?.isAuth ?? 0,
          isLogicalDelete: row?.isLogicalDelete ?? "",
          logicalDelete: row?.logicalDelete ?? 0,
          logicalDeleteColumn: row?.logicalDeleteColumn ?? ""
        }
      },
      width: "48%",
      draggable: true,
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(editForm, { ref: formRef }),
      beforeSure: (done, { options }) => {
        const FormRef = formRef.value.getRef();
        const curData = options.props.formInline as GenTablesFormItemProps;
        FormRef.validate(valid => {
          if (valid) {
            // 表单规则校验通过
            if (title === "新增") {
              createGenTables(curData).then(res => {
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
              updateGenTables(curData).then(res => {
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
