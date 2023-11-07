import dayjs from "dayjs";
import editForm from "../form.vue";
import impTable from "../importTable.vue";
import { message } from "@/utils/message";
import {
  type GenTablesFormItemProps,
  getGenTablesPage,
  updateGenTables,
  delGenTables,
  getDbs,
  listDbTable,
  importTable,
  GenCode
} from "@/api/tool/gen-tables";
import { type PaginationProps } from "@pureadmin/table";
import { reactive, ref, onMounted, h, toRaw } from "vue";
import { addDialog } from "@/components/ReDialog";
import { getKeyList } from "@pureadmin/utils";

export function useGenTables() {
  const qform = reactive({
    page: 1,
    pageSize: 10,
    tableName: null,
    dbName: null
  });

  // 查询参数
  const impForm = reactive({
    page: 1,
    pageSize: 10,
    dbName: null,
    tableName: undefined,
    tableComment: undefined
  });
  const formRef = ref();
  const dataList = ref([]);
  const loading = ref(true);
  const dbOptions = ref([]);
  // 表数据
  const dbTableList = ref([]);
  const tables = ref([]);

  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    currentPage: 1,
    background: true
  });

  const impPagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    currentPage: 1,
    background: true
  });
  const columns: TableColumnList = [
    {
      label: "id",
      prop: "tableId",
      minWidth: 120
    },
    {
      label: "表名",
      prop: "tableName",
      minWidth: 120
    },
    {
      label: "库名",
      prop: "dbName",
      minWidth: 120
    },
    {
      label: "描述",
      prop: "tableComment",
      minWidth: 120
    },
    {
      label: "类名",
      prop: "className",
      minWidth: 120
    },
    // {
    //   label: "tplCategory",
    //   prop: "tplCategory",
    //   minWidth: 120
    // },
    {
      label: "包名",
      prop: "packageName",
      minWidth: 120
    },
    {
      label: "模块",
      prop: "moduleName",
      minWidth: 120
    },
    // {
    //   label: "前端文件名",
    //   prop: "moduleFrontName",
    //   minWidth: 120
    // },
    {
      label: "业务名",
      prop: "businessName",
      minWidth: 120
    },
    {
      label: "方法名",
      prop: "functionName",
      minWidth: 120
    },
    {
      label: "作者",
      prop: "functionAuthor",
      minWidth: 120
    },
    // {
    //   label: "pkColumn",
    //   prop: "pkColumn",
    //   minWidth: 120
    // },
    // {
    //   label: "pkGoField",
    //   prop: "pkGoField",
    //   minWidth: 120
    // },
    // {
    //   label: "pkJsonField",
    //   prop: "pkJsonField",
    //   minWidth: 120
    // },
    // {
    //   label: "options",
    //   prop: "options",
    //   minWidth: 120
    // },
    // {
    //   label: "treeCode",
    //   prop: "treeCode",
    //   minWidth: 120
    // },
    // {
    //   label: "treeParentCode",
    //   prop: "treeParentCode",
    //   minWidth: 120
    // },
    // {
    //   label: "treeName",
    //   prop: "treeName",
    //   minWidth: 120
    // },
    // {
    //   label: "tree",
    //   prop: "tree",
    //   minWidth: 120
    // },
    {
      label: "crud",
      prop: "crud",
      minWidth: 120
    },
    {
      label: "remark",
      prop: "remark",
      minWidth: 120
    },
    {
      label: "isDataScope",
      prop: "isDataScope",
      minWidth: 120
    },
    {
      label: "isActions",
      prop: "isActions",
      minWidth: 120
    },
    {
      label: "isAuth",
      prop: "isAuth",
      minWidth: 120
    },
    {
      label: "isLogicalDelete",
      prop: "isLogicalDelete",
      minWidth: 120
    },
    {
      label: "logicalDelete",
      prop: "logicalDelete",
      minWidth: 120
    },
    {
      label: "logicalDeleteColumn",
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

  const dbcolumns: TableColumnList = [
    {
      label: "勾选列", // 如果需要表格多选，此处label必须设置
      type: "selection",
      fixed: "left",
      reserveSelection: true // 数据刷新后保留选项
    },
    {
      label: "表名",
      prop: "tableName",
      minWidth: 120
    },
    {
      label: "库名",
      prop: "tableSchema",
      minWidth: 120
    },
    {
      label: "描述",
      prop: "tableComment",
      minWidth: 120
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
    }
  ];

  function handleDelete(row) {
    delGenTables({ ids: [row.tableId] }).then(res => {
      if (res.code == 200) {
        message(`删除成功`, { type: "success" });
        onSearch();
      } else {
        message(`删除失败`, { type: "error" });
      }
    });
  }

  function handleGen(row) {
    const genForm = {
      tableId: row.tableId,
      force: false
    };
    GenCode(genForm).then(res => {
      if (res.code == 200) {
        message(`生成成功`, { type: "success" });
        onSearch();
      } else {
        message(`生成失败`, { type: "error" });
      }
    });
    // delGenTables({ ids: [row.tableId] }).then(res => {
    //   if (res.code == 200) {
    //     message(`删除成功`, { type: "success" });
    //     onSearch();
    //   } else {
    //     message(`删除失败`, { type: "error" });
    //   }
    // });
  }

  // 查询表数据
  function getDbTableList() {
    listDbTable(impForm).then(res => {
      if (res.code === 200) {
        dbTableList.value = res.data.list;
        impPagination.total = res.data.total;
        impPagination.currentPage = res.data.currentPage;
        impPagination.pageSize = res.data.pageSize;
      }
    });
  }

  /** 导入按钮操作 */
  function handleImportTable() {
    const tbs = getKeyList(tables.value, "tableName");
    const tableForm = {
      dbName: impForm.dbName,
      tables: tbs
    };
    importTable(tableForm).then(res => {
      if (res.code === 200) {
        onSearch();
        message("导入成功", {
          type: "success"
        });
      } else {
        message("导入失败", {
          type: "error"
        });
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
    tables.value = val;
  }

  function handleDbSizeChange(val: number) {
    impForm.pageSize = val;
    getDbTableList();
  }

  function handleDbCurrentChange(val: number) {
    impForm.page = val;
    getDbTableList();
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

  function onGetDbs() {
    getDbs().then(res => {
      dbOptions.value = res.data;
    });
  }

  const resetForm = formEl => {
    if (!formEl) return;
    formEl.resetFields();
    onSearch();
  };

  function openDialog(title = "新增", row?: GenTablesFormItemProps) {
    addDialog({
      title: `${title}编辑`,
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
      width: "60%",
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

  function importDialog() {
    addDialog({
      title: `导入`,
      width: "70%",
      draggable: true,
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(impTable, { ref: formRef })
    });
  }

  /** 数据权限 可自行开发 */
  // function handleDatabase() {}

  onMounted(() => {
    onGetDbs();
    onSearch();
  });

  return {
    qform,
    loading,
    columns,
    dbcolumns,
    dataList,
    pagination,
    dbOptions,
    dbTableList,
    impForm,
    impPagination,
    handleGen,
    getDbTableList,
    handleImportTable,
    onSearch,
    resetForm,
    openDialog,
    importDialog,
    handleDelete,
    handleSizeChange,
    handleCurrentChange,
    handleDbSizeChange,
    handleDbCurrentChange,
    handleSelectionChange
  };
}
