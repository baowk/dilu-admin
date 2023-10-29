<script setup lang="ts">
import { ref } from "vue";
import { useBillSt } from "./utils/hook";
import { PureTableBar } from "@/components/RePureTableBar";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";

// import More from "@iconify-icons/ep/more-filled";
import Search from "@iconify-icons/ep/search";
import Refresh from "@iconify-icons/ep/refresh";

defineOptions({
  name: "bill"
});

const formRef = ref();
const {
  qform,
  loading,
  columns,
  dataList,
  onSearch,
  resetForm,
  toStDay,
  toStMonth
} = useBillSt();
</script>

<template>
  <div class="main">
    <el-form
      ref="formRef"
      :inline="true"
      :model="qform"
      class="search-form bg-bg_color w-[99/100] pl-8 pt-[12px]"
    >
      <el-form-item label="开始时间：" prop="begin">
        <el-date-picker
          v-model="qform.begin"
          type="date"
          placeholder="选择日期"
        />
      </el-form-item>
      <el-form-item label="结束时间：" prop="end">
        <el-date-picker
          v-model="qform.end"
          type="date"
          placeholder="选择日期"
        />
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
        <el-button :icon="useRenderIcon(Refresh)" @click="resetForm(formRef)">
          重置
        </el-button>
        <el-button
          type="primary"
          :icon="useRenderIcon(Search)"
          :loading="loading"
          @click="toStDay"
        >
          日报表
        </el-button>
        <el-button
          type="primary"
          :icon="useRenderIcon(Search)"
          :loading="loading"
          @click="toStMonth"
        >
          月报表
        </el-button>
      </el-form-item>
    </el-form>

    <PureTableBar title="账单列表" :columns="columns" @refresh="onSearch">
      <template v-slot="{ size, dynamicColumns }">
        <pure-table
          align-whole="center"
          showOverflowTooltip
          table-layout="auto"
          :loading="loading"
          :size="size"
          adaptive
          :data="dataList"
          :columns="dynamicColumns"
          :paginationSmall="size === 'small' ? true : false"
          :header-cell-style="{
            background: 'var(--el-fill-color-light)',
            color: 'var(--el-text-color-primary)'
          }"
        />
      </template>
    </PureTableBar>
  </div>
</template>

<style scoped lang="scss">
:deep(.el-dropdown-menu__item i) {
  margin: 0;
}

.search-form {
  :deep(.el-form-item) {
    margin-bottom: 12px;
  }
}
</style>
