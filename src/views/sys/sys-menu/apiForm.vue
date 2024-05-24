<script setup lang="ts">
import dayjs from "dayjs";
import { reactive, ref, onMounted, nextTick } from "vue";
import { type PaginationProps } from "@pureadmin/table";
import { message } from "@/utils/message";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import Refresh from "@iconify-icons/ep/refresh";
import Search from "@iconify-icons/ep/search";
import { PureTableBar } from "@/components/RePureTableBar";
import { getApiList } from "@/api/sys/sys-menu";
import { SysApiProps } from "@/api/sys/sys-menu";

const dataList = ref([]);
const formRef = ref();
const loading = ref(true);
const multipleTable = ref();
const multipleSelection = ref([]);
const props = withDefaults(defineProps<SysApiProps>(), {
  formInline: () => ({
    page: 1,
    pageSize: 10,
    path: "",
    menuId: null
  })
});

const queryForm = reactive({
  page: 1,
  pageSize: 10,
  path: "",
  menuId: Number(props.formInline.menuId)
});

const pagination = reactive<PaginationProps>({
  total: 0,
  pageSize: 10,
  currentPage: 1,
  background: true
});

const columns: TableColumnList = [
  {
    type: "selection",
    width: 50,
    align: "left"
  },
  {
    label: "标题",
    prop: "title",
    minWidth: 150
  },
  {
    label: "请求类型",
    prop: "method",
    minWidth: 120
  },
  {
    label: "请求地址",
    prop: "path",
    minWidth: 180
  },
  {
    label: "权限类型",
    prop: "permType",
    minWidth: 80,
    cellRenderer: ({ row }) => {
      const { status } = row;
      const map = {
        1: "无需认证",
        2: "须token",
        3: "须鉴权"
      };
      return map[status];
    }
  },
  {
    label: "状态",
    prop: "status",
    minWidth: 80,
    cellRenderer: ({ row }) => {
      const { status } = row;
      const map = {
        1: "删除",
        2: "可用",
        3: "可用"
      };
      return map[status];
    }
  },
  {
    label: "更新时间",
    prop: "updatedAt",
    minWidth: 130,
    formatter: ({ updatedAt }) => dayjs(updatedAt).format("YYYY-MM-DD HH:mm:ss")
  }
];

const onSearch = async () => {
  loading.value = true;
  const { msg, code, data } = await getApiList({ ...queryForm });
  loading.value = false;
  if (code === 200) {
    dataList.value = data.list;
    pagination.total = data.total;
    nextTick(() => {
      dataList.value.forEach(item => {
        if (item.sysMenuId > 0) {
          multipleTable.value.getTableRef().toggleRowSelection(item, true);
        }
      });
    });

    return;
  }
  message(msg, {
    type: "error"
  });
};
function handleSizeChange(val: number) {
  console.log("🚀 ~ handleSizeChange ~ val:", val);
  queryForm.pageSize = val;
  pagination.pageSize = val;
  onSearch();
}

function handleCurrentChange(val: number) {
  console.log("🚀 ~ handleCurrentChange ~ val:", val);
  queryForm.page = val;
  pagination.currentPage = val;
  onSearch();
}
const resetForm = () => {
  if (!formRef.value) return;
  formRef.value.resetFields();
  onSearch();
};
function getId() {
  return multipleSelection.value;
}

defineExpose({ getId });
onMounted(() => {
  onSearch();
});
</script>
<template>
  <el-form inline :model="queryForm" ref="formRef">
    <el-form-item label="请求地址" prop="path">
      <el-input v-model="queryForm.path" clearable placeholder="请输入" />
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        :icon="useRenderIcon(Search)"
        :loading="loading"
        @click="onSearch"
      >
        搜索
      </el-button>
      <el-button :icon="useRenderIcon(Refresh)" @click="resetForm">
        重置
      </el-button>
    </el-form-item>
  </el-form>
  <PureTableBar title="" :columns="columns" @refresh="onSearch">
    <template v-slot="{ size, dynamicColumns }">
      <pure-table
        ref="multipleTable"
        align-whole="center"
        showOverflowTooltip
        table-layout="auto"
        :loading="loading"
        :size="size"
        :data="dataList"
        :columns="dynamicColumns"
        :pagination="pagination"
        :paginationSmall="size === 'small'"
        :header-cell-style="{
          background: 'var(--el-fill-color-light)',
          color: 'var(--el-text-color-primary)'
        }"
        @selection-change="multipleSelection = $event"
        @page-size-change="handleSizeChange"
        @page-current-change="handleCurrentChange"
      />
    </template>
  </PureTableBar>
</template>
