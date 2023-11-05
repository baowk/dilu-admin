import dayjs from "dayjs";
import editForm from "../form.vue";
import { message } from "@/utils/message";
import {
  getGenColumnsPage,
  createGenColumns,
  updateGenColumns,
  delGenColumns
} from "@/api/tool/gen-columns";
//import { ElMessageBox } from "element-plus";
//import { usePublicHooks } from "@/utils/hooks";
import { addDialog } from "@/components/ReDialog";
import { type GenColumnsFormItemProps } from "@/api/tool/gen-columns";
import { type PaginationProps } from "@pureadmin/table";
import { reactive, ref, onMounted, h, toRaw } from "vue";

export function useGenColumns() {
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
      label: "",
      prop: "columnId",
      minWidth: 120
    },
    {
      label: "",
      prop: "tableId",
      minWidth: 120
    },
    {
      label: "",
      prop: "columnName",
      minWidth: 120
    },
    {
      label: "",
      prop: "columnComment",
      minWidth: 120
    },
    {
      label: "",
      prop: "columnType",
      minWidth: 120
    },
    {
      label: "",
      prop: "goType",
      minWidth: 120
    },
    {
      label: "",
      prop: "goField",
      minWidth: 120
    },
    {
      label: "",
      prop: "jsonField",
      minWidth: 120
    },
    {
      label: "",
      prop: "isPk",
      minWidth: 120
    },
    {
      label: "",
      prop: "isIncrement",
      minWidth: 120
    },
    {
      label: "",
      prop: "isRequired",
      minWidth: 120
    },
    {
      label: "",
      prop: "isInsert",
      minWidth: 120
    },
    {
      label: "",
      prop: "isEdit",
      minWidth: 120
    },
    {
      label: "",
      prop: "isList",
      minWidth: 120
    },
    {
      label: "",
      prop: "isQuery",
      minWidth: 120
    },
    {
      label: "",
      prop: "queryType",
      minWidth: 120
    },
    {
      label: "",
      prop: "htmlType",
      minWidth: 120
    },
    {
      label: "",
      prop: "dictType",
      minWidth: 120
    },
    {
      label: "",
      prop: "sort",
      minWidth: 120
    },
    {
      label: "",
      prop: "list",
      minWidth: 120
    },
    {
      label: "",
      prop: "pk",
      minWidth: 120
    },
    {
      label: "",
      prop: "required",
      minWidth: 120
    },
    {
      label: "",
      prop: "superColumn",
      minWidth: 120
    },
    {
      label: "",
      prop: "usableColumn",
      minWidth: 120
    },
    {
      label: "",
      prop: "increment",
      minWidth: 120
    },
    {
      label: "",
      prop: "insert",
      minWidth: 120
    },
    {
      label: "",
      prop: "edit",
      minWidth: 120
    },
    {
      label: "",
      prop: "query",
      minWidth: 120
    },
    {
      label: "",
      prop: "remark",
      minWidth: 120
    },
    {
      label: "",
      prop: "fkTableName",
      minWidth: 120
    },
    {
      label: "",
      prop: "fkTableNameClass",
      minWidth: 120
    },
    {
      label: "",
      prop: "fkTableNamePackage",
      minWidth: 120
    },
    {
      label: "",
      prop: "fkLabelId",
      minWidth: 120
    },
    {
      label: "",
      prop: "fkLabelName",
      minWidth: 120
    },
    {
      label: "",
      prop: "createBy",
      minWidth: 120
    },
    {
      label: "",
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
    delGenColumns({ ids: [row.id] }).then(res => {
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
    const { data } = await getGenColumnsPage(toRaw(qform));
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

  function openDialog(title = "新增", row?: GenColumnsFormItemProps) {
    addDialog({
      title: `${title}GenColumns`,
      props: {
        formInline: {
          columnId: row?.columnId ?? 0,
          tableId: row?.tableId ?? 0,
          columnName: row?.columnName ?? "",
          columnComment: row?.columnComment ?? "",
          columnType: row?.columnType ?? "",
          goType: row?.goType ?? "",
          goField: row?.goField ?? "",
          jsonField: row?.jsonField ?? "",
          isPk: row?.isPk ?? "",
          isIncrement: row?.isIncrement ?? "",
          isRequired: row?.isRequired ?? "",
          isInsert: row?.isInsert ?? "",
          isEdit: row?.isEdit ?? "",
          isList: row?.isList ?? "",
          isQuery: row?.isQuery ?? "",
          queryType: row?.queryType ?? "",
          htmlType: row?.htmlType ?? "",
          dictType: row?.dictType ?? "",
          sort: row?.sort ?? 0,
          list: row?.list ?? "",
          pk: row?.pk ?? 0,
          required: row?.required ?? 0,
          superColumn: row?.superColumn ?? 0,
          usableColumn: row?.usableColumn ?? 0,
          increment: row?.increment ?? 0,
          insert: row?.insert ?? 0,
          edit: row?.edit ?? 0,
          query: row?.query ?? 0,
          remark: row?.remark ?? "",
          fkTableName: row?.fkTableName ?? "",
          fkTableNameClass: row?.fkTableNameClass ?? "",
          fkTableNamePackage: row?.fkTableNamePackage ?? "",
          fkLabelId: row?.fkLabelId ?? "",
          fkLabelName: row?.fkLabelName ?? ""
        }
      },
      width: "48%",
      draggable: true,
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(editForm, { ref: formRef }),
      beforeSure: (done, { options }) => {
        const FormRef = formRef.value.getRef();
        const curData = options.props.formInline as GenColumnsFormItemProps;
        FormRef.validate(valid => {
          if (valid) {
            // 表单规则校验通过
            if (title === "新增") {
              createGenColumns(curData).then(res => {
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
              updateGenColumns(curData).then(res => {
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
