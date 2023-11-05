import { stQuery, stDay, stMonth } from "@/api/dental/bill";
import { addDialog } from "@/components/ReDialog";
import { reactive, ref, onMounted, toRaw, h } from "vue";

export function useBillSt() {
  const qform = reactive({
    page: 1,
    pageSize: 10,
    begin: null,
    end: null,
    deptPath: null,
    userId: null,
    teamId: null
  });

  const dataList = ref([]);
  const loading = ref(true);
  const items = ref([]);

  const columns: TableColumnList = [
    {
      label: "咨询师",
      prop: "name",
      minWidth: 110
    },
    {
      label: "目标",
      prop: "target",
      minWidth: 120
    },

    {
      label: "成交金额",
      prop: "deal",
      minWidth: 120
    },
    {
      label: "实收",
      prop: "paid",
      minWidth: 120
    },
    {
      label: "欠款",
      prop: "curdebt",
      minWidth: 120,
      cellRenderer: ({ row }) => <dev>{row.deal - row.paid}</dev>
    },
    {
      label: "收回上月欠款",
      prop: "debt",
      minWidth: 120
    },
    {
      label: "退款",
      prop: "refund",
      minWidth: 120
    },
    {
      label: "留存",
      prop: "newCustomerCnt",
      minWidth: 110
    },
    {
      label: "初诊",
      prop: "firstDiagnosis",
      minWidth: 110
    },
    {
      label: "复诊",
      prop: "furtherDiagnosis",
      minWidth: 110
    },
    {
      label: "成交数",
      prop: "dealCnt",
      minWidth: 110
    }
  ];

  function toStDay() {
    stDay(qform).then(res => {
      if (res.code == 200) {
        items.value = res.data;
        addDialog({
          title: "日报表",
          fullscreenIcon: true,
          contentRenderer: () =>
            h(
              "div",
              items.value.map((item, index) => {
                return h("div", { key: index }, item);
              })
            )
        });
      }
    });
  }

  function toStMonth() {
    stMonth(qform).then(res => {
      if (res.code == 200) {
        items.value = res.data;
        addDialog({
          title: "月报表",
          fullscreenIcon: true,
          contentRenderer: () =>
            h(
              "div",
              items.value.map((item, index) => {
                return h("div", { key: index }, item);
              })
            )
        });
      }
    });
  }

  function handleSelectionChange(val) {
    console.log("handleSelectionChange", val);
  }

  async function onSearch() {
    loading.value = true;
    const { data } = await stQuery(toRaw(qform));
    dataList.value = data;
    setTimeout(() => {
      loading.value = false;
    }, 500);
  }

  const resetForm = formEl => {
    if (!formEl) return;
    formEl.resetFields();
    //onSearch();
  };

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
    toStDay,
    toStMonth,
    onSearch,
    resetForm,
    handleSelectionChange
  };
}
