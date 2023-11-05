<script setup lang="ts">
import { useGenTables } from "./utils/hook";
import { PureTableBar } from "@/components/RePureTableBar";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";

import Search from "@iconify-icons/ep/search";
import AddFill from "@iconify-icons/ri/add-circle-line";
const {
  loading,
  dbcolumns,
  dbOptions,
  dbTableList,
  impForm,
  impPagination,
  getDbTableList,
  handleImportTable,
  handleDbSizeChange,
  handleDbCurrentChange,
  handleSelectionChange
} = useGenTables();
</script>

<template>
  <div class="main">
    <el-form
      ref="formRef"
      :inline="true"
      :model="impForm"
      class="search-form bg-bg_color w-[99/100] pl-8 pt-[12px]"
    >
      <el-form-item label="库名：" prop="dbName">
        <el-select
          v-model="impForm.dbName"
          placeholder="请选择库名"
          clearable
          class="!w-[180px]"
        >
          <el-option
            v-for="(item, index) in dbOptions"
            :key="index"
            :label="item.label"
            :value="item.label"
          />
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="表名：" prop="tableName">
        <el-input
          v-model="impForm.tableName"
          placeholder="请输入表名"
          clearable
          class="!w-[180px]"
        />
      </el-form-item> -->

      <el-form-item>
        <el-button
          type="primary"
          :icon="useRenderIcon(Search)"
          :loading="loading"
          @click="getDbTableList"
        >
          搜索
        </el-button>
        <!-- <el-button :icon="useRenderIcon(Refresh)" @click="resetForm(formRef)">
          重置
        </el-button> -->
      </el-form-item>
    </el-form>

    <PureTableBar title="列表" :columns="dbcolumns" @refresh="getDbTableList">
      <template #buttons>
        <Auth value="sys:genTables:add">
          <el-button
            type="primary"
            :icon="useRenderIcon(AddFill)"
            @click="handleImportTable()"
          >
            添加
          </el-button>
        </Auth>
      </template>
      <template v-slot="{ size, dynamicColumns }">
        <pure-table
          row-key="tableName"
          ref="tableRef"
          align-whole="center"
          showOverflowTooltip
          table-layout="auto"
          :loading="loading"
          :size="size"
          adaptive
          :data="dbTableList"
          :columns="dynamicColumns"
          :pagination="impPagination"
          :paginationSmall="size === 'small' ? true : false"
          :header-cell-style="{
            background: 'var(--el-fill-color-light)',
            color: 'var(--el-text-color-primary)'
          }"
          @selection-change="handleSelectionChange"
          @page-size-change="handleDbSizeChange"
          @page-current-change="handleDbCurrentChange"
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
